import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './component.css';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [category, setCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('accessToken');
    const [user, setUser] = useState([])
    const navigate = useNavigate();

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    const handleClick = () => {
        navigate('/addProduct');
    };
    const handleCategoryAll = () => {
        navigate('/CategoryAll');
    };
    const handleCategory = () => {
        navigate('/allCategory');
    };
    const handlepassword = () => {
        navigate('/sendOTP')
    }



    const handleDelete = (id) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `http://localhost:5000/api/deleteProducts/${id}`);
        xhr.setRequestHeader('Authorization', token);
        xhr.onload = () => {
            if (xhr.status === 200) {
                navigate('/allProducts');
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
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    navigate('/');
                }

                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:5000/api/products', true);
                xhr.setRequestHeader('Authorization', token);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            const response = JSON.parse(xhr.responseText);
                            setProducts(response.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())));
                            console.log(products.imagePath);
                        } else {
                            console.error('Error fetching products:', xhr.statusText);
                        }
                    }
                };
                xhr.send();
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchUser = async (id) => {
            try {
                console.log(token);
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
                setUser(response.data.user);
                console.log(response.data.user);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };


        console.log(products.images);
        fetchUser();
        fetchProducts();
    }, [searchTerm]);

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary mt-5 mb-3">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <h2>Product list</h2>
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
                            <button className="btn btn-primary btn-sm mx-3" type="button" onClick={handleCategoryAll}>Category All</button>
                            <button className="btn btn-primary btn-sm mx-3" type="button" onClick={handleCategory}>Category</button>
                            <button className="btn btn-primary btn-sm mx-3" type="button" onClick={handlepassword}>change password</button>
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
                            <p class="title product-title">{user.firstName}</p>
                        </div>
                    </div>
                </div>
            </nav>
            {/* <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category ID</th>
            <th>Price</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.categoryId}</td>
              <td>{product.price}</td>
              <td>
                {Array.isArray(product.images) &&
                  product.images.map((image, i) => (
                    <img key={i} src={image} alt={`Product ${i}`} style={{ maxWidth: '100px' }} />
                  ))}
                  <div>
                    {product.images && product.images.split(',').map((imagePath, index) => {
                        <img src={`http://localhost:5000${imagePath}`} key={index} alt={`product${index}`} style={{width:'50px', height:'50px'}}/>
                    })}
                  </div>
                  
              </td>
              <td>
                <button className="btn btn-warning btn-sm" type="button" onClick={() => navigate(`/updateProduct/${product.id}`)}>
                  Edit
                </button>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
            <div className='product-grid'>
                {products.map((product, index) => (
                    <div class="card" key={index}>
                        <div>
                            {product.images && product.images.split(',').map((imagePath, index) => {
                                <img src={`http://localhost:5000${product.imagePath}`} key={index} alt={`product${index}`} style={{ width: '50px', height: '50px' }} />
                                // <img src={`http://localhost:5000${product.imagePath}`} style={{width:'50px', height:'50px'}}/>
                                // console.log(products.imagePath);
                            })}
                        </div>
                        <div class="card-content">
                            <p class="title product-title">{product.name}</p>

                            <div class="content">
                                {product.description}
                                <br></br>
                                {product.price}
                            </div>

                            {/* <a class="More-Details is-primary" href="product.html" target="_blank">
                                <strong>More Details</strong>
                            </a> */}
                            <br></br>
                            <button className="More-Details" type="button" onClick={() => navigate(`/`)}>
                                More Details
                            </button>
                            <br></br>
                            <br></br>
                            <div className='product-button'>
                                <button className="Edit" type="button" onClick={() => navigate(`/updateProduct/${product.id}`)}>
                                    Edit
                                </button>

                                <button className="Delete" type="button" onClick={() => handleDelete(product.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ProductTable;