<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // I campi che possono essere riempiti con il metodo mass assignment
    protected $fillable = [
        'name',
        'description',
        'category',
        'price',
        'sku',
        'size',
        'color',
        'image_url',
    ];

    // Eventuali cast per trasformare i dati
    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function inventory()
    {
        return $this->hasOne(Inventory::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

}

