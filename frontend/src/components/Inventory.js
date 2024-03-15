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

    const handleRemoveProduct = (productId) => {
        console.log('Removing product with id:', productId);
    };

    const handleModifyProduct = (productId) => {
        console.log('Modifying product with id:', productId);
    };

    const handleAddProduct = () => {
        console.log('Adding a new product');
    };

    return (
        <div>
            <h2>Product List</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <div key={product.id} style={styles.productBox}>
                        <strong>Name:</strong> {product.name}<br />
                        <strong>Category:</strong> {product.category}<br />
                        <strong>Price:</strong> {product.price} USD<br />
                        <strong>Quantity:</strong> {product.quantity}<br />
                        <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                        <button onClick={() => handleModifyProduct(product.id)}>Modify</button>
                    </div>
                ))}
            </div>
            <button onClick={handleAddProduct}>Add a new product</button>
        </div>
    );
};

const styles = {
    productBox: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px',
        minWidth: '200px',
        maxWidth: '300px',
    },
};

export default Inventory;
