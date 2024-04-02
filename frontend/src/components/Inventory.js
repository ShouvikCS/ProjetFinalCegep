import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    const handleRemoveProduct = async (productId) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/deleteproducts/${productId}/`);
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error removing product:', error);
        }
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
                        <Link to={`/manager/inventory/update/${product.id}`}>
                            <button>Modify</button>
                        </Link>
                        <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                    </div>
                ))}
            </div>
            <Link to="/manager/inventory/add">
                <button>Add a new product</button>
            </Link>
            <br></br>
                <Link to={"/login"}>
            <button>{"back to login"}</button>
        </Link>
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
