import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Login from './pages/Login';
import { setAuthToken } from './services/api';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (token) => {
        setAuthToken(token);
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={isLoggedIn ? <ProductList /> : <Login onLogin={handleLogin} />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
            </Routes>
        </Router>
    );
}

export default App;
