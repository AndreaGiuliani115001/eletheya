import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {getProductById, updateProduct} from '../services/api';
import {TextField, Button, Typography, Paper, Box} from '@mui/material';

function EditProduct() {
    const {id} = useParams(); // Ottiene l'ID del prodotto dalla rotta
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
    const [success, setSuccess] = useState('');

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
                setSuccess('');
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
            await updateProduct(id, formData);
            setSuccess('Prodotto modificato con successo!');
            setError('');// Invio al backend
        } catch (err) {
            setError('Errore nella modifica del prodotto.');
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
            <Paper elevation={3} style={{padding: '20px', maxWidth: '600px', width: '100%'}}>
                <Typography variant="h4" align="center" gutterBottom>
                    Modifica Prodotto
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
                        style={{marginTop: '20px'}}
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
                        style={{marginTop: '20px'}}
                    >
                        Modifica Prodotto
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default EditProduct;
