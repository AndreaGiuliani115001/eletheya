import axios from 'axios';

// Configurazione base di Axios
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // URL del backend Laravel
});

// Funzione per impostare il token di autenticazione
export const setAuthToken = (token) => {
    if (token) {
        console.log('Imposto il token:', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        console.log('Rimuovo il token.');
        delete api.defaults.headers.common['Authorization'];
    }
};

// Funzione per ottenere i prodotti
export const getProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Errore nel caricamento dei prodotti:', error.response?.data || error.message);
        throw error;
    }
};

// Funzione per ottenere un singolo prodotto in base all'id
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Errore nel caricamento del prodotto:', error.response?.data || error.message);
        throw error;
    }
};

// Funzione per creare un nuovo prodotto
export const createProduct = async (formData) => {
    try {
        const response = await api.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Errore nella creazione del prodotto:', error.response?.data || error.message);
        throw error;
    }
};

// Funzione per aggiornare un prodotto
export const updateProduct = async (id, formData) => {
    try {
        console.log('Headers inviati:', api.defaults.headers.common);
        console.log('Dati inviati (FormData):');
        formData.append('_method', 'PUT');
        const response = await api.post(`/products/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error('Errore nell\'aggiornamento del prodotto:', error.response?.data || error.message);
        throw error;
    }
};

// Funzione per eliminare un prodotto
export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Errore nell\'eliminazione del prodotto:', error.response?.data || error.message);
        throw error;
    }
};



export default api;
