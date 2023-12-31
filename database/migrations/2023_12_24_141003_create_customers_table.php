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
        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->nullable(false);
            $table->string('phone_number')->nullable(false)->unique();
            $table->text('full_address_destination')->nullable(false);
            $table->double('start_lat')->nullable(false);
            $table->double('start_long')->nullable(false);
            $table->double('dest_lat')->nullable(false);
            $table->double('dest_long')->nullable(false);
            $table->string('dest_total_distance')->nullable(false);
            $table->string('dest_total_time')->nullable(false);
            $table->string('item_name')->nullable(false);
            $table->enum('item_type', ['barang', 'dokumen'])->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
