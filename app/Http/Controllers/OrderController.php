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
            'description' => 'Semua pesanan yang terdaftar.',
            'customers' => Customer::with(['orders' => function ($query) {
                $query->whereIn('status', ['siap dikirim', 'belum siap dikirim'])
                    ->withCount('items');
            }])
                ->whereHas('orders', function ($query) {
                    $query->whereIn('status', ['siap dikirim', 'belum siap dikirim']);
                })
                ->get()
                ->map(function ($customer) {
                    return [
                        'order_id' => $customer->orders->first()->id,
                        'name' => $customer->name,
                        'items_count' => $customer->orders->sum('items_count'),
                        'status' => $customer->orders->first()->status,
                        'created_at' => $customer->orders->first()->created_at,
                    ];
                })
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
    public function show(Order $order)
    {
        //
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
        $order->update([
            'status' => $request->status,
            'customer_id' => $request->customer_id,
        ]);

        $currentItemIds = $order->items()->pluck('id')->toArray();

        // Create an array of 'id' values from $request->items, excluding any items that do not have an 'id'
        $requestItemIds = array_filter(array_column($request->items, 'id'));

        foreach ($request->items as $item) {
            if (isset($item['id'])) {
                // Update the existing item
                Item::where('id', $item['id'])->update([
                    'receipt_number' => $item['receipt_number'],
                ]);
            } else {
                // Add a new item
                Item::create([
                    'id' => Str::uuid(),
                    'receipt_number' => $item['receipt_number'],
                    'order_id' => $order->id,
                ]);
            }
        }

        // Delete the removed items
        $deletedItemIds = array_diff($currentItemIds, $requestItemIds);
        Item::whereIn('id', $deletedItemIds)->delete();

        return to_route('orders.index');
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
