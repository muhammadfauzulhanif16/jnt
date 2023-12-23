<?php

use App\Http\Controllers\CourierController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::fallback(function () {
    if (auth()->check()) {
        return redirect('/dashboard/couriers');
    } else {
        return to_route('login');
    }
});

Route::middleware('auth')->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::resource('couriers', CourierController::class);
    });

});

require __DIR__ . '/auth.php';
