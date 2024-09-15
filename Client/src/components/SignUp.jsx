import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

// Define validation schema without role
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Valid email is required")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = await validate();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData, {
        withCredentials: true,
      });
      // Handle successful signup (e.g., redirect or show a success message)
      alert("Signup successful");
    } catch (error) {
      // Handle error response from the backend
      console.error(
        "Signup error:",
        error.response?.data?.error || "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.name && <p>{errors.name}</p>}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      {errors.password && <p>{errors.password}</p>}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        Signup
      </button>
    </form>
  );
};

export default Signup;
