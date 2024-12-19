import React, {useState} from 'react';
import {createProduct} from '../services/api';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

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
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f5f5f5"
        >
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', width: '100%' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Aggiungi un Prodotto
                </Typography>
                {error && <Typography color="error" align="center">{error}</Typography>}
                {success && <Typography color="primary" align="center">{success}</Typography>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Descrizione"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                        multiline
                    />
                    <TextField
                        label="Categoria"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Prezzo"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Taglia"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Colore"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        component="label"
                        style={{ marginTop: '20px' }}
                    >
                        Carica Immagine
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                    >
                        Aggiungi Prodotto
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default AddProduct;
