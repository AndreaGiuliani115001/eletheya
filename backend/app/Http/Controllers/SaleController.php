<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Product;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    // Ottenere tutte le vendite
    public function index()
    {
        return Sale::with('product')->get();
    }

    // Registrare una nuova vendita
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity_sold' => 'required|integer|min:1',
        ]);

        $product = Product::find($validated['product_id']);

        // Controllo scorte in magazzino
        if ($product->inventory->quantity < $validated['quantity_sold']) {
            return response()->json(['error' => 'Scorte insufficienti'], 400);
        }

        // Ridurre il magazzino
        $product->inventory->update([
            'quantity' => $product->inventory->quantity - $validated['quantity_sold'],
        ]);

        // Calcolare il prezzo totale
        $validated['total_price'] = $product->price * $validated['quantity_sold'];

        // Registrare la vendita
        $sale = Sale::create($validated);

        return $sale->load('product');
    }

    // Mostrare una singola vendita
    public function show(Sale $sale)
    {
        return $sale->load('product');
    }

    // Eliminare una vendita
    public function destroy(Sale $sale)
    {
        // Ripristinare il magazzino
        $product = $sale->product;
        $product->inventory->update([
            'quantity' => $product->inventory->quantity + $sale->quantity_sold,
        ]);

        $sale->delete();

        return response(null, 204);
    }
}
