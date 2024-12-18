import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                console.log('Prodotti recuperati:', data);
                setProducts(data);
            } catch (err) {
                console.error('Errore nel caricamento dei prodotti:', err.message);
                setError('Errore nel caricamento dei prodotti.');
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h1>Elenco Prodotti</h1>
            {/* Aggiungi un link per accedere al form di creazione */}
            <Link to="/add-product">
                <button>Aggiungi Nuovo Prodotto</button>
            </Link>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} €
                        <Link to={`/edit-product/${product.id}`}>
                            <button>Modifica</button>
                        </Link>
                        <button onClick={() => handleDelete(product.id)}>Elimina</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
