<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->enum('status', ['belum siap dikirim', 'siap dikirim', 'belum dipickup', 'sudah dipickup'])->nullable(false);
            $table->uuid('customer_id')->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade')->nullable(false);
            $table->uuid('courier_id')->foreign('courier_id')->references('id')->on('couriers')->onDelete('cascade')->nullable();
            $table->string('scheduling_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
