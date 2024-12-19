import React, {useState, useEffect} from 'react';
import {login} from '../services/auth';
import {setAuthToken} from '../services/api';
import {motion} from 'framer-motion';
import {TextField, Button, Typography, Paper, Box} from '@mui/material';

function Login({onLogin}) {

    useEffect(() => {
        console.log('Componente Login montato');
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            setAuthToken(data.token);
            onLogin(data.token);
            setError('');
        } catch (err) {
            setError('Credenziali non valide. Riprova.');
        }
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 50}} // Iniziale (nascosto)
            animate={{opacity: 1, y: 0}}  // Animazione
            transition={{duration: 0.5}}  // Durata della transizione
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                bgcolor="#f5f5f5"
            >
                <Paper elevation={3} style={{padding: '20px', maxWidth: '400px', width: '100%'}}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{marginTop: '20px'}}
                        >
                            Accedi
                        </Button>
                    </form>
                </Paper>
            </Box>
        </motion.div>
    );
}

export default Login;
