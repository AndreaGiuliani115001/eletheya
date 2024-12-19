import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
    Grid, Card, CardContent, CardMedia, Typography, Button, Stack, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null); // Prodotto selezionato per la conferma
    const [isModalOpen, setIsModalOpen] = useState(false); // Stato del modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                setError('Errore nel caricamento dei prodotti.');
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async () => {
        try {
            if (selectedProduct) {
                await deleteProduct(selectedProduct.id);
                setProducts(products.filter((product) => product.id !== selectedProduct.id));
                setIsModalOpen(false); // Chiudi il modal
            }
        } catch (err) {
            setError('Errore nell\'eliminazione del prodotto.');
        }
    };

    const openModal = (product) => {
        setSelectedProduct(product); // Imposta il prodotto selezionato
        setIsModalOpen(true); // Apri il modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Chiudi il modal
        setSelectedProduct(null); // Resetta il prodotto selezionato
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Lista Prodotti
            </Typography>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/add-product')}
                style={{ marginBottom: '20px' }}
            >
                Aggiungi Nuovo Prodotto
            </Button>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`http://127.0.0.1:8000/storage/${product.image_url}`}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h6">
                                            {product.name + " " + product.description}
                                        </Typography>
                                        <Typography variant="h6">{product.size}</Typography>
                                    </Box>
                                    <Typography color="text.secondary">{product.color}</Typography>
                                    <Stack direction="row" spacing={2} marginTop={2}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<EditIcon />}
                                            onClick={() => navigate(`/edit-product/${product.id}`)}
                                        >
                                            Modifica
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => openModal(product)} // Apri il modal
                                        >
                                            Elimina
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* Modal di Conferma */}
            <Dialog
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <DialogTitle id="modal-title">Conferma Eliminazione</DialogTitle>
                <DialogContent>
                    <DialogContentText id="modal-description">
                        Sei sicuro di voler eliminare il prodotto{' '}
                        <strong>{selectedProduct?.name}</strong>? Questa azione non può essere annullata.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Annulla
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Elimina
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ProductList;
