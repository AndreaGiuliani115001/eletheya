import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Navbar from './pages/Navbar';
import Sidebar from './pages/Sidebar';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Login from './pages/Login';
import { setAuthToken } from './services/api';

const drawerWidth = 240; // Larghezza della sidebar

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogin = (token) => {
        setAuthToken(token);
        setIsLoggedIn(true);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            {isLoggedIn ? (
                <Box sx={{ display: 'flex' }}>
                    <Navbar toggleSidebar={toggleSidebar} />
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            marginLeft: isSidebarOpen ? `${drawerWidth}px` : '0px',
                            transition: 'margin-left 0.3s ease',
                        }}
                    >
                        {/* Aggiungi spazio per la navbar */}
                        <Toolbar />
                        <Routes>
                            <Route path="/" element={<ProductList />} />
                            <Route path="/add-product" element={<AddProduct />} />
                            <Route path="/edit-product/:id" element={<EditProduct />} />
                        </Routes>
                    </Box>
                </Box>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </Router>
    );
}

export default App;
