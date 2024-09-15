import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        ...data,
        role: 'admin', // Ensure the role is admin for admin login
      });
      localStorage.setItem('token', response.data.token); // Save token in local storage
      alert('Login successful');
      // Redirect to admin dashboard or another protected route
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || 'Login failed'}`);
    }
  };

  return (
    <>
      <div className="form-cont">
      <div className="form-content">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-cont'>
          <label>Username</label>
          <input {...register('username')} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className='input-cont'>
          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-btn">
        <button type="submit">Login</button>
      </div>
      </form>
      </div>
      </div>
    </>
  );
};

export default AdminLogin;
