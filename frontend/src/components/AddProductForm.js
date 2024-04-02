import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const AddProductForm = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/addproducts/', {
                name,
                category,
                price,
                quantity
            });
            alert('Product added successfully!');
            // Reset form fields
            setName('');
            setCategory('');
            setPrice(''); 
            setQuantity(''); 
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                <button type="submit">Add Product</button>
            </form>
            <br></br>
                <Link to={"/manager/inventory"}>
            <button>{"back to inventory"}</button>
        </Link>
        </div>
    );
};

export default AddProductForm;
