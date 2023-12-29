<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use GuzzleHttp\Client;
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
    public function store(StoreCustomerRequest $request)
    {
        $apiKey = 's-zaYHY2QTdLh2sT0ilfQCcFq9oiXf0z0izpqlqWOoQ';
        $client = new Client();
        $url = 'https://geocode.search.hereapi.com/v1/geocode';
        $response = $client->request('GET', $url, [
            'query' => [
                'apiKey' => $apiKey,
                'q' => $request->address,
            ],
        ]);

        $data = json_decode($response->getBody()->getContents(), true);

        // $request->merge([
        //     'address_latitude' => $response['items'][0]['position']['lat'],
        //     'address_longitude' => $response['items'][0]['position']['lng'],
        // ]);

        Customer::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'latitude' => $data['items'][0]['position']['lat'],
            'longitude' => $data['items'][0]['position']['lng'],
            'address_distance' => intval($request->address_distance),
            'item_name' => $request->item_name,
            'item_type' => $request->item_type,
        ]);

        // try {



        // } catch (\Exception $e) {
        // }

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
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->update([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'address_distance' => $request->address_distance,
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
