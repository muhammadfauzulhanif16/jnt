<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'phone_number',
        'full_address_destination',
        'start_lat',
        'start_long',
        'dest_lat',
        'dest_long',
        'dest_total_distance',
        'dest_total_time',
        'item_name',
        'item_type',
        'updated_at',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function items()
    {
        return $this->hasManyThrough(Item::class, Order::class);
    }
}
