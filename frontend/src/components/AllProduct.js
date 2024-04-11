import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './component.css';
import {BsSearch} from 'react-icons/bs'

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    console.log(products);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const token = localStorage.getItem('accessToken');

    // const handleSearch = (event) => {
    // //  navigate("/search");
    // };

    const [searchVal, setSearchVal] = useState("");
    function handleSearch() {
        if (searchVal === "") { setProducts(products); return; }
        const filterBySearch = products.filter((item) => {
            // if (item.toLowerCase()
            //     .includes(searchVal.toString().toLowerCase())) { return item; }
        })
        setProducts(filterBySearch);
    }


//     const filteredPersons = details.filter(
//     person => {
//       return (
//         person
//         .name
//         .toLowerCase()
//         .includes(searchField.toLowerCase()) ||
//         person
//         .email
//         .toLowerCase()
//         .includes(searchField.toLowerCase())
//       );
//     }
//   );

    const navigate = useNavigate();

    const handleNextPage = () => {
        setPage(page + 1);
      };
    
      const handlePreviousPage = () => {
        if (page > 1) {
          setPage(page - 1);
        }
      };
    

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/')
    }

    const handleClick = () => {
        navigate('/addProduct');
    }

    const handleImageClick = () => {

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


                const token = localStorage.getItem('accessToken')
                if(!token){
                    navigate('/')
                }

                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:5000/api/products', true);
                xhr.setRequestHeader('Authorization', token);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            const response = JSON.parse(xhr.responseText);
                            setProducts(response);
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

        fetchProducts();
    }, []);




    return (
        <div className="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary mt-5 mb-3">

                <div class="container-fluid">

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <h2>Product list</h2>

                    </div>

                    <div class="d-flex align-items-center">
                        <div class="dropdown">
                        <input onChange={e => setSearchVal(e.target.value)}>
                        </input>
                            <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handleSearch}>Search</button>
                            <button className="btn btn-warning btn-sm mx-5" type="button" onClick={handleLogout}>Log Out</button>
                            <a class="navbar-brand mt-2 mt-lg-0" href='' onClick={handleImageClick}>
                            <img
                                src={''}
                                alt="Profile Picture"
                                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                            />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <table className="table">
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
                                {Array.isArray(product.images) && product.images.map((image, i) => (
                                    <img key={i} src={image} alt={`Product ${i}`} style={{ maxWidth: '100px' }} />
                                ))}
                            </td>
                            <td>{<button className="btn btn-primary btn-sm" onClick={() => navigate(`/updateProduct/${product.id}`)}>Edit</button>}</td>
                            <td>{<button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='allproduct-button'>
                <button className="btn btn-primary btn-sm" type="button" onClick={handleClick}>Add Product</button>

                <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handlePreviousPage} disabled={page === 1}>Previous Page</button>
                <span className="mx-2">Page {page}</span>

                <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handleNextPage} disabled={products.length < pageSize}>Next Page</button>
            </div>
        </div>
    );
};

export default ProductTable;
