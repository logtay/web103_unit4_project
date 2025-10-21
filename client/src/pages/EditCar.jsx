import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar, deleteCar } from '/services/CarsAPI.jsx';
import * as data from '../carData.js';
import { calculatePrice } from '../utilities/calcprice.js';
import '../css/Form.css';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    convertible: false,
    exterior: '',
    interior: '',
    roof: '',
    wheels: '',
    price: 0
  });

  // Fetch existing car
  useEffect(() => {
    const fetchCar = async () => {
      const numericId = Number(id);
      if (isNaN(numericId)) return; // prevent bad requests
      try {
        const car = await getCarById(numericId);
        if (car) {
          setFormData({
            name: car.name || '',
            convertible: car.convertible || false,
            exterior: car.exterior?.trim() || '',
            interior: car.interior?.trim() || '',
            roof: car.roof?.trim() || '',
            wheels: car.wheels?.trim() || '',
            price: parseFloat(car.price) || 0
          });
        }
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const totalPrice = calculatePrice(formData);

const handleSubmit = async (e) => {
  e.preventDefault();
  const numericId = Number(id);
  if (isNaN(numericId)) return;

  try {
    const updatedCar = { ...formData, price: totalPrice };
    await updateCar(numericId, updatedCar);

    console.log('Car updated successfully:', updatedCar);
    navigate('/items'); 
  } catch (error) {
    console.error('Error updating car:', error);
  }
};

const handleDelete = async () => {
  const numericId = Number(id);
  if (isNaN(numericId)) return;

  if (window.confirm('Are you sure you want to delete this car?')) {
    try {
      await deleteCar(numericId);
      navigate('/items');          
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  }
};


  return (
    <div className='create-car-container'>
      <div className='create-card'>
        <h2>Edit Car</h2>
        <form className='create-form' onSubmit={handleSubmit}>
          <label>
            Name:
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Convertible:
            <input
              type="checkbox"
              name="convertible"
              checked={formData.convertible}
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
            <select
              name="roof"
              value={formData.roof}
              onChange={handleChange}
              disabled={formData.convertible}
              required
            >
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

          <p className="price-display">Total Price: ${totalPrice}</p>

          <button type="submit">Update Car</button>
        </form>

        <button onClick={handleDelete}>Delete Car</button>
      </div>
    </div>
  );
};

export default EditCar;
