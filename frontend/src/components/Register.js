import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  gender: yup.string().required('Gender is required'),
  hobbies: yup.string().required('Hobbies are required'),
  profile_pic: yup.mixed().required('Profile picture is required'),
});

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      hobbies: '',
      profile_pic: null,
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        for (const key in values) {
          if (values.hasOwnProperty(key)) {
            formData.append(key, values[key]);
          }
        }

        const response = await axios.post('http://localhost:5000/api/users/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status >= 200) {
          console.log('Registered successfully.');
          navigate('/otp');
        } else {
          console.log(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        console.error('Error registering user:', error.message || JSON.stringify(error));
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('profile_pic', event.target.files[0]);
  };

  const handleLogin = (event) => {
    navigate('/')
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Sign Up</h2>
          {formik.errors.profile_pic && <div className="alert alert-danger">{formik.errors.profile_pic}</div>}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" required className="form-control" id="firstName" name="firstName" {...formik.getFieldProps('firstName')} />
              {formik.errors.firstName && <div className="text-danger">{formik.errors.firstName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" required className="form-control" id="lastName" name="lastName" {...formik.getFieldProps('lastName')} />
              {formik.errors.lastName && <div className="text-danger">{formik.errors.lastName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" required className="form-control" id="email" name="email" {...formik.getFieldProps('email')} />
              {formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" required className="form-control" id="password" name="password" {...formik.getFieldProps('password')} />
              {formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" required className="form-control" id="confirmPassword" name="confirmPassword" {...formik.getFieldProps('confirmPassword')} />
              {formik.errors.confirmPassword && <div className="text-danger">{formik.errors.confirmPassword}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <input type="text" required className="form-control" id="gender" name="gender" {...formik.getFieldProps('gender')} />
              {formik.errors.gender && <div className="text-danger">{formik.errors.gender}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="hobbies" className="form-label">Hobbies</label>
              <input type="text" required className="form-control" id="hobbies" name="hobbies" {...formik.getFieldProps('hobbies')} />
              {formik.errors.hobbies && <div className="text-danger">{formik.errors.hobbies}</div>}
            </div>
            <div className='mb-3'>
              <label htmlFor="profile_pic" className="form-label">Profile Picture</label>
              <input type="file" className="form-control" id="profile_pic" name="profile_pic" onChange={handleFileChange} />
              {formik.errors.profile_pic && <div className="text-danger">{formik.errors.profile_pic}</div>}
            </div>

            <div className='button'>

              <button
                className="btn btn-primary btn-sm mx-1 Login"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="btn btn-primary btn-sm mx-1 Register"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;


