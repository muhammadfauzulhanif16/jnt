<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Customers/Index', [
            'title' => 'Daftar Pelanggan',
            'description' => 'Semua pelanggan yang terdaftar.',
            'customers' => Customer::withCount('orders')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Customers/Create', [
            'title' => 'Tambah Pelanggan',
            'description' => 'Daftarkan pelanggan baru.',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Customer::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'full_address_destination' => $request->full_address_destination,
            'start_lat' => $request->start_lat,
            'start_long' => $request->start_long,
            'dest_lat' => $request->dest_lat,
            'dest_long' => $request->dest_long,
            'dest_total_distance' => $request->dest_total_distance,
            'dest_total_time' => $request->dest_total_time,
            'item_name' => $request->item_name,
            'item_type' => $request->item_type,
        ]);

        return to_route('customers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        return inertia('Customers/Show', [
            'title' => 'Rincian Pelanggan',
            'description' => 'Detail pelanggan yang terdaftar.',
            'customer' => $customer,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        return inertia('Customers/Edit', [
            'title' => 'Ubah Pelanggan',
            'description' => 'Ubah pelanggan yang terdaftar.',
            'customer' => $customer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        $customer->update([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'full_address_destination' => $request->full_address_destination,
            'start_lat' => $request->start_lat,
            'start_long' => $request->start_long,
            'dest_lat' => $request->dest_lat,
            'dest_long' => $request->dest_long,
            'dest_total_distance' => $request->dest_total_distance,
            'dest_total_time' => $request->dest_total_time,
            'item_name' => $request->item_name,
            'item_type' => $request->item_type,
            'updated_at' => now(),
        ]);

        return to_route('customers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return to_route('customers.index');
    }
}
