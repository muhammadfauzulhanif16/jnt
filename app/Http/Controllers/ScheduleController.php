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
            'customers' => Customer::with(['orders' => function ($query) {
                $query->whereIn('status', ['sudah dipickup', 'belum dipickup'])
                    ->whereNotNull('scheduling_time')
                    ->withCount('items')
                    ->with('courier');
            }])
                ->whereHas('orders', function ($query) {
                    $query->whereIn('status', ['sudah dipickup', 'belum dipickup'])
                        ->whereNotNull('scheduling_time');
                })
                ->get()
                ->map(function ($customer) {
                    return [
                        'order_id' => $customer->orders->first()->id,
                        'customer_id' => $customer->id,
                        'customer_name' => $customer->name,
                        'items_count' => $customer->orders->sum('items_count'),
                        'status' => $customer->orders->first()->status,
                        'scheduling_time' => $customer->orders->first()->scheduling_time,
                        'courier_name' => $customer->orders->first()->courier->full_name,
                    ];
                })
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $order_id = $request->query('order_id');
        return Inertia::render("Schedule/Create", [
            'title' => 'Tambah Penjadwalan',
            'description' => "Daftarkan jadwal baru [$order_id].",
            'order_id' => $order_id,
            'couriers' => User::where('role', 'courier')->get()->map(function ($courier) {
                return [
                    'value' => $courier->id,
                    'label' => $courier->full_name,
                ];
            }),
        ]);
    }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    public function store(Request $request)
    {
        Order::find($request->order_id)->update([
            'courier_id' => $request->courier_id,
            'status' => 'belum dipickup',
            'scheduling_time' => $request->scheduling_time,
        ]);

        return to_route('schedule.index');
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Courier $courier)
    // {
    //     //
    // }

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
}
