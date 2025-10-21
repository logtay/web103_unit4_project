import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar, deleteCar } from '/services/CarsAPI.jsx';
import * as data from '../carData.js';
import { calculatePrice } from '../utilities/calcprice.js';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    convertible: 'Non-Convertible',
    exterior: '',
    interior: '',
    roof: '',
    wheels: '',
    price: 0
  });

  // Fetch car details on mount
useEffect(() => {
  const fetchCar = async () => {
    try {
      const car = await getCarById(Number(id));
      if (car) {
        setFormData({
          name: car.name || '',
          convertible: car.convertible ? 'Convertible' : 'Non-Convertible',
          exterior: car.exterior?.trim() || '',
          interior: car.interior?.trim() || '',
          roof: car.roof?.trim() || '',
          // FIX: match wheels against available options
          wheels: data.wheelsOptions.find(opt => opt.name === car.wheels?.trim())?.name || '',
          price: parseFloat(car.price) || 0
        });
      }
    } catch (error) {
      console.error('Error fetching car:', error);
    }
  };
  fetchCar();
}, [id]);


  // Handle input/select changes
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'convertible' ? (checked ? 'Convertible' : 'Non-Convertible') : value
    });
  };

  // Calculate total price of current selections
  const totalPrice = calculatePrice(formData);

  // Handle form submit (update car)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCar = { ...formData, price: totalPrice };
      await updateCar(id, updatedCar);
      console.log('Car updated successfully:', updatedCar);
      navigate('/items'); // redirect after update
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id);
        navigate('/items');
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  return (
    <div>
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Convertible:
          <input
            type="checkbox"
            name="convertible"
            checked={formData.convertible === 'Convertible'}
            onChange={handleChange}
          />
        </label>

        <label>
          Exterior:
          <select name="exterior" value={formData.exterior} onChange={handleChange} required>
            <option value="">Select Exterior</option>
            {data.exteriorOptions.map(opt => (
              <option key={opt.name} value={opt.name}>{opt.name} (${opt.price})</option>
            ))}
          </select>
        </label>

        <label>
          Interior:
          <select name="interior" value={formData.interior} onChange={handleChange} required>
            <option value="">Select Interior</option>
            {data.interiorOptions.map(opt => (
              <option key={opt.name} value={opt.name}>{opt.name} (${opt.price})</option>
            ))}
          </select>
        </label>

        <label>
          Roof:
          <select name="roof" value={formData.roof} onChange={handleChange} required>
            <option value="">Select Roof</option>
            {data.roofOptions.map(opt => (
              <option key={opt.name} value={opt.name}>{opt.name} (${opt.price})</option>
            ))}
          </select>
        </label>

        <label>
          Wheels:
          <select name="wheels" value={formData.wheels} onChange={handleChange} required>
            <option value="">Select Wheels</option>
            {data.wheelsOptions.map(opt => (
              <option key={opt.name} value={opt.name}>{opt.name} (${opt.price})</option>
            ))}
          </select>
        </label>

        {/* Display total price */}
        <p>Total Price: ${totalPrice}</p>

        <button type="submit">Update Car</button>
      </form>

      <button
        onClick={handleDelete}
        style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}
      >
        Delete Car
      </button>
    </div>
  );
};

export default EditCar;
