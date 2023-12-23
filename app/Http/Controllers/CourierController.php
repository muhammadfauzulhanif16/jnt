<?php

namespace App\Http\Controllers;

use App\Models\Courier;
use App\Http\Requests\StoreCourierRequest;
use App\Http\Requests\UpdateCourierRequest;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CourierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Couriers/Index", [
            'title' => 'Daftar Kurir',
            'description' => 'Semua kurir yang terdaftar.',
            'couriers' => User::where('role', 'courier')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Couriers/Create", [
            'title' => 'Tambah Kurir',
            'description' => 'Tambahkan kurir baru.',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(StoreCourierRequest $request)
    public function store(Request $request)
    {
        User::create([
            'id' => Str::uuid(),
            'full_name' => $request->full_name,
            'username' => $request->username,
            'password' => bcrypt($request->password),
        ]);

        return to_route('couriers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Courier $courier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Courier $courier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourierRequest $request, Courier $courier)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Courier $courier)
    {
        //
    }
}
