<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'receipt_number',
        'order_id',
        'updated_at'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
