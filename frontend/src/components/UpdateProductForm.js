import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateProductForm = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: 0,
        quantity: 0
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/updateproducts/${id}/`);
                setProduct(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/updateproducts/${id}/`, formData);
            alert('Product updated successfully');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            <label>Category:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} />

            <label>Price:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} />

            <label>Quantity:</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />

            <button type="submit">Update Product</button>
        </form>
    );
};

export default UpdateProductForm;
