<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    // Campi riempibili tramite mass assignment
    protected $fillable = [
        'product_id',
        'quantity_sold',
        'total_price',
        'sale_date',
    ];

    // Relazione con il modello Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

