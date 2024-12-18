import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/api';

function EditProduct() {
    const { id } = useParams(); // Ottiene l'ID del prodotto dalla rotta
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [sku, setSku] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    // Carica i dettagli del prodotto al montaggio
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(id);
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category);
                setSku(product.sku);
                setSize(product.size);
                setColor(product.color);
            } catch (err) {
                setError('Errore nel caricamento del prodotto.');
            }
        };
        fetchProduct();
    }, [id]);

    // Gestisce il submit del form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('sku', sku);
        formData.append('size', size);
        formData.append('color', color);
        if (image) {
            formData.append('image', image);
        }

        console.log('Dati inviati:', [...formData.entries()]); // Log dei dati inviati
        console.log('URL inviato:', `/products/${id}`);

        try {
            await updateProduct(id, formData); // Invio al backend
            navigate('/'); // Reindirizza alla lista dei prodotti
        } catch (err) {
            setError('Errore nell\'aggiornamento del prodotto.');
        }
    };


    return (
        <div>
            <h1>Modifica Prodotto</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Descrizione"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Prezzo"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Taglia"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Colore"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Aggiorna Prodotto</button>
            </form>
        </div>
    );
}

export default EditProduct;
