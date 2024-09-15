// src/pages/Cars.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarList from '../components/CarList';

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars');
        setCars(response.data);
      } catch (error) {
        setError('Failed to fetch cars. Please try again later.');
        console.error('Failed to fetch cars', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p>Loading cars...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Cars</h1>
      <CarList cars={cars} />
    </div>
  );
}

export default Cars;
