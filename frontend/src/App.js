import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../src/components/Login';
import AllProduct from '../src/components/AllProduct';
import AddProduct from '../src/components/AddProduct';
import AddCategory from './components/AddCategory';
import UpdateProduct from './components/EditProduct';
import Register from './components/Register';
import Category from './components/category';
import OTPscreen from './components/OtpScreen';
import SendOTPEmail from './components/sendOTPEmail';
import ForgatePass from './components/forgatePass';
import CategoryAll from './components/getAllCategory';
import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/allProducts" element={<AllProduct />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/CategoryAll" element={<CategoryAll />} />
      <Route path="/AdminLogin" element={<AdminLogin />} />
      <Route path="/addCategory" element={<AddCategory />} />
      <Route path="/updateProduct/:id" element={<UpdateProduct />} />
      <Route path="/register" element={<Register />} />
      <Route path='/allCategory' element={<Category/>}/>
      <Route path='/addCategory' element={<AddCategory/>}/>
      <Route path='/otp' element={<OTPscreen/>}/>
      <Route path='/sendOTP' element={<SendOTPEmail/>}/>
      <Route path='/updatePass' element={<ForgatePass/>}/>
      
    </Routes>
  );
}

export default App; 