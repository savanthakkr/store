import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './component.css';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';

const CategoryAll = () => {
    const [category, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('accessToken');
    const [user, setUser] = useState([])
    const navigate = useNavigate();

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    const handleClick = () => {
        navigate('/addProduct');
    };
    const handleCategory = () => {
        navigate('/allCategory');
    };
    const addCategory = () => {
        navigate('/addCategory');
    };

    const handleDelete = (id) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `http://localhost:5000/api/deleteCategory/${id}`);
        xhr.setRequestHeader('Authorization', token);
        xhr.onload = () => {
            if (xhr.status === 200) {
                navigate('/allCategory');
                window.location.reload();
            } else {
                console.error('Failed to delete the book');
            }
        };
        xhr.onerror = () => {
            console.error('Error making the delete request');
        };
        xhr.send();
        console.log('delete book with id ', id);
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    navigate('/');
                }

                const headers = {
                    'Authorization': token
                };

                const response = await axios.get('http://localhost:5000/api/getCategory', { headers });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching Category:', error);
            }
        };

        const fetchUser = async (id) => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.log('No token found. User is not authenticated.');
                    navigate("/");
                    return;
                }

                const headers = {
                    'Authorization': token
                };

                const response = await axios.get(`http://localhost:5000/api/users/profile/${id}`, { headers });
                setUser(response);
                console.log(setUser);
                // console.log(user.profile_pic);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
        fetchCategory();
    }, [searchTerm]);

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary mt-5 mb-3">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <h2>Category list</h2>
                        <form className="d-flex" role="search">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="form-control me-2"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                <BsSearch />
                            </button>
                        </form>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="dropdown">
                            <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                onClick={handleClick}
                            >
                                Add Product
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                onClick={addCategory}
                            >
                                Add Category
                            </button>
                            <button className="btn btn-primary btn-sm mx-3" type="button" onClick={handleCategory}>Category</button>
                            <button className="btn btn-primary btn-sm mx-3" type="button" onClick={handleLogout}>Log Out</button>
                            {/* <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handlePreviousPage} disabled={page === 1}>
                                Previous Page
                            </button>
                            <span className="mx-2">Page {page}</span>
                            <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handleNextPage} disabled={products.length < pageSize}>
                                Next Page
                            </button> */}
                            <img
                                src={`http://localhost:5000/${user.profile_pic}`}
                                height="30"
                                width="30"
                                alt="user" />
                        </div>
                    </div>
                </div>
            </nav>
            <div className='product-grid'>
                <div class="card">
                    <div class="card-content">
                        <p class="title product-title">Category List</p>
                        <div class="content">
                            <select>
                                {category.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryAll;