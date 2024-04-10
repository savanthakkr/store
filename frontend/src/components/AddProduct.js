import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ onSubmit }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        categoryId: '',
        price: '',
        images: null
    });
    const token = localStorage.getItem('accessToken');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files[0] });
    };

    const handleShowAllProducts = () => {
        navigate('/allProducts');
    }

    const handleCancel = () => {
        navigate('/allProducts');
    }


    // const jwt = require('jsonwebtoken');



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.categoryId || !formData.price || !formData.images ) {
            setErrorMessage('All fields are required!');
            return;
        }
        const { name, description, categoryId, price, images } = formData;
 
    
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/api/createProducts', true);
        xhr.setRequestHeader('Authorization', token);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Product created successfully');
    
                } else {
                    console.error('Error creating product:', xhr.responseText);
    
                }
            }
        };
        xhr.send(
            JSON.stringify({
                name,
                description,
                categoryId,
                price,
                images: images.name
            })
        );
        navigate('/allProducts');
    };


    // i want to decode token and fetch user id from token and store in product table

    // i want to fetch user id from genrated token 

    return (
        <Container>
            <h1 className="text-center mt-5">Add Product</h1>
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    <div>
                        <div className="form-group mx-3 mt-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="form-group mx-3 mt-3">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="form-group mx-3 mt-3">
                            <label htmlFor="categoryId">Category ID</label>
                            <input type="text" className="form-control" id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} />
                        </div>
                        <div className="form-group mx-3 mt-3">
                            <label htmlFor="price">Price</label>
                            <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
                        </div>
                        <div className="form-group mx-3 mt-3">
                            <label htmlFor="images">Images</label>
                            <div className="custom-file mx-3 mt-3">
                                <input type="file" className="custom-file-input" id="images" name="images" onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>
            <div className='allproduct-button mt-5'>
            <button className="btn btn-primary" onClick={handleShowAllProducts}>
                        Show All Products
                    </button>
                    <button className="btn btn-danger mr-2 mx-3" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-primary mr-2 mx-3" onClick={handleSubmit}>
                        Submit
                    </button>
            </div>
        </Container>

    );
};

export default ProductForm;
