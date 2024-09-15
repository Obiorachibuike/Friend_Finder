import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import "../styles/admin_signup.css"

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const AdminSignup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        ...data,
        role: 'admin', // Set role to admin by default
      });
      alert('Signup successful');
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || 'Signup failed'}`);
    }
  };

  return (
    <>
      <div className="form-cont">
        <div className="form-content">

      <h1>Admin Signup </h1>
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
        {/* Hidden field for role */}
        <input type="hidden" value="admin" {...register('role')} />
        <div className="form-btn">

        <button type="submit">Signup</button>
        </div>
      </form>
    </div>
        </div>
      </>
  );
};

export default AdminSignup;
