<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class ProductController extends Controller
{
    // Ottenere tutti i prodotti
    public function index()
    {
        return Product::all();
    }

    // Creare un nuovo prodotto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'sku' => 'required|string|unique:products',
            'size' => 'nullable|string',
            'color' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Controlla se l'immagine è stata caricata
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads', 'public'); // Salva l'immagine nella cartella 'storage/app/public/uploads'
            $validated['image_url'] = $path; // Aggiungi il percorso al validato
        }

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    // Mostrare un singolo prodotto
    public function show(Product $product)
    {
        return $product;
    }

    // Aggiornare un prodotto
    public function update(Request $request, Product $product)
    {
        Log::info('Intestazioni ricevute:', $request->headers->all());
        Log::info('Dati ricevuti (raw):', $request->all());
        Log::info('File ricevuti:', $request->file());

        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'sku' => 'required|string|unique:products,sku,' . $product->id,
            'size' => 'nullable|string',
            'color' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads', 'public');
            $validated['image_url'] = $path;
        }

        $product->update($validated);

        Log::info('Prodotto aggiornato:', $product->toArray());

        return response()->json($product, 200);
    }


    // Eliminare un prodotto
    public function destroy(Product $product)
    {

        // Verifica se esiste un'immagine associata al prodotto
        if ($product->image_url) {
            $filePath = storage_path('app/public/' . $product->image_url);
            if (file_exists($filePath)) {
                unlink($filePath); // Elimina il file dal filesystem
            }
        }

        $product->delete();
        return response()->json(['message' => 'Prodotto eliminato con successo'], 200);
    }
}

