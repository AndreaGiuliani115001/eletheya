import api from './api';

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data; // Restituisce il token
    } catch (error) {
        console.error('Errore durante il login:', error.response?.data || error.message);
        throw error;
    }
};
