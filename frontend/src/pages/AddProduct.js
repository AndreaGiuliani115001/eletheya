import React, {useState} from 'react';
import {createProduct} from '../services/api';

function AddProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [sku, setSku] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('sku', sku);
        formData.append('size', size);
        formData.append('color', color);

        if (image) {
            formData.append('image', image);
        }

        try {
            await createProduct(formData); // Invio diretto del formData
            setSuccess('Prodotto creato con successo!');
            setError('');
            // Resetta i campi
            setName('');
            setDescription('');
            setPrice('');
            setCategory('');
            setSku('');
            setSize('');
            setColor('');
            setImage(null);
        } catch (err) {
            setError('Errore nella creazione del prodotto.');
            setSuccess('');
        }
    };


    return (
        <div>
            <h1>Aggiungi un Prodotto</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>{success}</p>}
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
                    type="number"
                    placeholder="Prezzo"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Taglia"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Colore"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Aggiungi Prodotto</button>
            </form>
        </div>
    );
}

export default AddProduct;
