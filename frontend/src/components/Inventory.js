import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <strong>{product.name}</strong> - {product.price} USD
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;
