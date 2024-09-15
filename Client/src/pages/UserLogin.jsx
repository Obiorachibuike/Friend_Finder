import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const UserLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        ...data,
        role: 'user', // Ensure the role is user for user login
      });
      localStorage.setItem('token', response.data.token); // Save token in local storage
      alert('Login successful');
      // Redirect to user dashboard or another protected route
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || 'Login failed'}`);
    }
  };

  return (
    <div>
       <div className="form-cont">
       <div className="form-content">
      <h1>User Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-cont'>
          <label>Email</label>
          <input type='email' {...register('email')} />
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
    </div>
  );
};

export default UserLogin;
