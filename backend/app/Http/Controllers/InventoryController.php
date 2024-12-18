<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    // Ottenere tutti gli elementi del magazzino
    public function index()
    {
        return Inventory::with('product')->get();
    }

    // Creare una nuova voce di magazzino
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:0',
            'min_quantity' => 'required|integer|min:0',
        ]);

        return Inventory::create($validated);
    }

    // Mostrare un singolo elemento di magazzino
    public function show(Inventory $inventory)
    {
        return $inventory->load('product');
    }

    // Aggiornare un elemento di magazzino
    public function update(Request $request, Inventory $inventory)
    {
        $validated = $request->validate([
            'quantity' => 'integer|min:0',
            'min_quantity' => 'integer|min:0',
        ]);

        $inventory->update($validated);
        return $inventory->load('product');
    }

    // Eliminare un elemento di magazzino
    public function destroy(Inventory $inventory)
    {
        $inventory->delete();
        return response(null, 204);
    }
}

