<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->nullable(false);
            $table->string('phone_number')->nullable(false)->unique();
            $table->string('address')->nullable(false);
            $table->unsignedInteger('address_distance')->nullable(false);
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
