<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;
    protected $table = 'inventory';

    // Campi riempibili tramite mass assignment
    protected $fillable = [
        'product_id',
        'quantity',
        'min_quantity',
    ];

    // Relazione con il modello Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

