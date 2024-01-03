<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Item;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Orders/Index', [
            'title' => 'Daftar Pesanan',
            'description' => 'Daftar pesanan yang sudah terdaftar.',
            'orders' => Order::select('id', 'status', 'customer_id', 'created_at', 'updated_at')
                ->with('customer:id,name,dest_total_distance')
                ->whereIn('status', ['siap dikirim', 'belum siap dikirim'])
                ->get()
                ->map(function ($order) {
                    return [
                        'order_id' => $order->id,
                        'customer_id' => $order->customer->id,
                        'customer_name' => $order->customer->name,
                        'customer_total_distance' => floatval($order->customer->dest_total_distance),
                        'items_count' => $order->items->count(),
                        'status' => $order->status,
                        'created_at' => $order->created_at,
                        'updated_at' => $order->updated_at,
                    ];
                })->sortBy('customer_total_distance')->values()->all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Orders/Create', [
            'title' => 'Tambah Pesanan',
            'description' => 'Daftarkan pesanan baru.',
            'customers' => Customer::select('id', 'name')
                ->whereDoesntHave('orders', function ($query) {
                    $query->whereIn('status', ['siap dikirim', 'belum siap dikirim']);
                })
                ->orderBy('name')
                ->get()
                ->map(function ($customer) {
                    return [
                        'value' => $customer->id,
                        'label' => $customer->name,
                    ];
                })
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $order = Order::create([
            'id' => Str::uuid(),
            'status' => $request->status,
            'customer_id' => $request->customer_id,
        ]);

        foreach ($request->items as $item) {
            Item::create([
                'id' => Str::uuid(),
                'receipt_number' => $item['receipt_number'],
                'order_id' => $order->id,
            ]);
        }

        return to_route('orders.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Order $order)
    {
        $customer = Customer::findOrFail($request->query('customer_id'));

        return inertia('Orders/Show', [
            'title' => "Rincian Pesanan [$customer->name]",
            'description' => "Daftar barang yang tersedia [$customer->name].",
            'items' => $order->items->sortBy('receipt_number')->map(function ($item) {
                return [
                    'receipt_number' => $item->receipt_number,
                ];
            })->values()->toArray(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return inertia('Orders/Edit', [
            'title' => 'Ubah Pesanan',
            'description' => 'Ubah pesanan yang sudah terdaftar.',
            'customers' => Customer::select('id', 'name')
                ->whereHas('orders', function ($query) use ($order) {
                    $query->where('id', $order->id)
                        ->whereIn('status', ['siap dikirim', 'belum siap dikirim']);
                })
                ->orderBy('name')
                ->get()
                ->map(function ($customer) {
                    return [
                        'value' => $customer->id,
                        'label' => $customer->name,
                    ];
                }),
            'order' => $order,
            'items' => $order->items->sortBy('receipt_number')->map(function ($item) {
                return [
                    'receipt_number' => $item->receipt_number,
                ];
            })->values()->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        if ($request->status !== $order->status) {
            if ($request->status === 'siap dikirim' || $request->status === 'belum siap dikirim') {
                $order->update([
                    'status' => $request->status,
                    'updated_at' => now(),
                ]);

                return to_route('orders.index');
            } else {
                $order->update([
                    'status' => $request->status,
                    'updated_at' => now(),
                ]);

                return to_route('schedule.index');
            }
        } else {
            $order->update([
                'status' => $request->status,
                'customer_id' => $request->customer_id,
            ]);

            $currentItemIds = $order->items()->pluck('id')->toArray();
            $requestItemIds = array_filter(array_column($request->items, 'id'));

            foreach ($request->items as $item) {
                if (isset($item['id'])) {
                    Item::where('id', $item['id'])->update([
                        'receipt_number' => $item['receipt_number'],
                        'updated_at' => now(),
                    ]);
                } else {
                    Item::create([
                        'id' => Str::uuid(),
                        'receipt_number' => $item['receipt_number'],
                        'order_id' => $order->id,
                    ]);
                }

                Order::where('id', $order->id)->update([
                    'updated_at' => now(),
                ]);
            }

            $deletedItemIds = array_diff($currentItemIds, $requestItemIds);
            Item::whereIn('id', $deletedItemIds)->delete();

            return to_route('orders.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return to_route('orders.index');
    }
}
