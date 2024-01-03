<?php

namespace App\Http\Controllers;

use App\Models\Courier;
use App\Models\Customer;
use App\Models\Order;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ScheduleController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Schedule/Index", [
            'title' => 'Daftar Penjadwalan',
            'description' => 'Semua jadwal yang tersedia.',
            'order_has_not_been_picked_up' => Order::with(['customer', 'courier'])
                ->where('status', 'belum dipickup')
                ->whereNotNull('scheduling_time')
                ->get()
                ->map(function ($order) {
                    return [
                        'order_id' => $order->id,
                        'customer_id' => $order->customer->id,
                        'customer_name' => $order->customer->name,
                        'items_count' => $order->items->count(),
                        'status' => $order->status,
                        'scheduling_time' => $order->scheduling_time,
                        'courier_name' => $order->courier->full_name,
                        'customer_total_distance' => floatval($order->customer->dest_total_distance),
                    ];
                })->sortBy('customer_total_distance')->values()->all(),
            'order_has_been_picked_up' => Order::with(['customer', 'courier'])
                ->where('status', 'sudah dipickup')
                ->whereNotNull('scheduling_time')
                ->get()
                ->map(function ($order) {
                    return [
                        'order_id' => $order->id,
                        'customer_id' => $order->customer->id,
                        'customer_name' => $order->customer->name,
                        'items_count' => $order->items->count(),
                        'status' => $order->status,
                        'scheduling_time' => $order->scheduling_time,
                        'courier_name' => $order->courier->full_name,
                        'customer_total_distance' => floatval($order->customer->dest_total_distance),
                    ];
                })->sortBy('customer_total_distance')->values()->all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $order = Order::find($request->input('order_id'));
        $customerName = $order->customer->name;
        return Inertia::render("Schedule/Create", [
            'title' => 'Tambah Penjadwalan',
            'description' => "Daftarkan jadwal baru untuk [$customerName].",
            'order_id' => $order->id,
            'couriers' => User::where('role', 'courier')->get()->map(function ($courier) {
                return [
                    'value' => $courier->id,
                    'label' => $courier->full_name,
                ];
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Order::find($request->order_id)->update([
            'courier_id' => $request->courier_id,
            'status' => 'belum dipickup',
            'scheduling_time' => $request->scheduling_time,
        ]);

        return to_route('schedule.index');
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(User $courier)
    // {
    //     return Inertia::render("Couriers/Edit", [
    //         'title' => 'Ubah Kurir',
    //         'description' => 'Ubah kurir yang terdaftar.',
    //         'courier' => $courier,
    //     ]);
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, User $courier)
    // {
    //     $courier->update([
    //         'full_name' => $request->full_name,
    //         'username' => $request->username,
    //         'password' => $request->password ? bcrypt($request->password) : $courier->password,
    //     ]);

    //     return to_route('couriers.index');
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(User $courier)
    // {
    //     $courier->delete();

    //     return to_route('couriers.index');
    // }

    public function print(Request $request)
    {
        return inertia::render('Schedule/Print', [
            'order_has_been_picked_up' => Order::with(['customer', 'courier'])
                ->where('status', 'sudah dipickup')
                ->whereNotNull('scheduling_time')
                ->get()
                ->map(function ($order) {
                    return [
                        'order_id' => $order->id,
                        'customer_id' => $order->customer->id,
                        'customer_name' => $order->customer->name,
                        'items_count' => $order->items->count(),
                        'status' => $order->status,
                        'scheduling_time' => $order->scheduling_time,
                        'courier_name' => $order->courier->full_name,
                        'customer_total_distance' => floatval($order->customer->dest_total_distance),
                    ];
                })->sortBy('customer_total_distance')->values()->all(),
        ]);
    }
}
