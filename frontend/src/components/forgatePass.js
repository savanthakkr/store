import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgatePass = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [Cpassword, setCPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        if(location.pathname === '/'){
            localStorage.removeItem('accessToken')
        }
 
    })

    const handleRegister = () => {
        navigate('/register');
    };
    const token = localStorage.getItem('accessToken');

    const handleSubmit = async (event, id) => {
        event.preventDefault();
        // try {
    
        //     if(password == Cpassword){
        //         const xhr = new XMLHttpRequest();
        //         xhr.open('PUT', `http://localhost:5000/api/users/updatePass`, true);
        //         xhr.setRequestHeader('Authorization', token);
        //         xhr.setRequestHeader('Content-Type', 'application/json');
          
        //         xhr.onload = () => {
        //           if (xhr.status === 200) {
        //             const response = JSON.parse(xhr.responseText);
        //             console.log(response.data);
        //             navigate('/allProducts');
        //           } else {
        //             console.error('Error updating password:', xhr.statusText);
        //           }
        //         };
          
        //         xhr.onerror = () => {
        //           console.error('Error updating password:', xhr.statusText);
        //         };
          
        //         xhr.send(
        //           JSON.stringify({
        //             password,
        //           })
        //       );
        //     }else{
        //         console.error('Error updating password:');
        //     }
          
        // } catch (error) {
        //   console.error('Error updating password:', error);
        // }

        try {


            if(password != Cpassword){
                console.log('No password match.');
            }

            const response = await axios.put(`http://localhost:5000/api/users/updatePass`, {password}, {
                headers: {
                    'Authorization': token
                }
            });

            if (response.status === 200) {
                navigate('/allProducts');

            } else {
                setErrorMessage('password failed. Please try again.');
                console.error('password failed:', response.data.message);
            }
        } catch (error) {
            console.error('An error occurred during password:', error);
            setErrorMessage('An error occurred during password. Please try again later.');
        }
      };

    return (
        <div className="login-form ">
                <h3 className="text-center">Login</h3>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form onSubmit={handleSubmit} className="mt-3">
                    <Form.Group controlId="otp">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="Password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="otp">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="Password"
                            placeholder="Enter your Password Again"
                            value={Cpassword}
                            onChange={(e) => setCPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Login
                    </Button>
                    <Button variant="primary" className="w-100 mt-3" onClick={handleRegister}>
                        SignUp
                    </Button>
                </Form>
            </div>
    );
};

export default ForgatePass;