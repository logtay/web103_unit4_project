import '../App.css';
import { useState } from 'react';
import { createCar } from '/services/CarsAPI.jsx';
import * as data from '../carData.js';
import { calculatePrice } from '../utilities/calcprice.js';
import { useNavigate } from 'react-router-dom';
import '../css/Form.css';
const CreateCar = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const totalPrice = calculatePrice({
    ...formData,
    convertible: formData.convertible ? 'Convertible' : 'Non-Convertible'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCar = { ...formData, price: totalPrice };

    try {
      await createCar(userCar);
      console.log('Car created successfully:', userCar);
      navigate('/items');
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <div className="create-car-container">
      <div className="create-card">
        <h2 className="create-title">Create a Car</h2>
        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter car name"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="convertible"
                checked={formData.convertible}
                onChange={handleChange}
              />
              Convertible
            </label>
          </div>

          <div className="form-group">
            <label>Exterior</label>
            <select name="exterior" value={formData.exterior} onChange={handleChange} required>
              <option value="">Select Exterior</option>
              {data.exteriorOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name} (${option.price})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Interior</label>
            <select name="interior" value={formData.interior} onChange={handleChange} required>
              <option value="">Select Interior</option>
              {data.interiorOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name} (${option.price})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Roof</label>
            <select name="roof" value={formData.roof} onChange={handleChange} disabled={formData.convertible} required>
              <option value="">Select Roof</option>
              {data.roofOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name} (${option.price})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Wheels</label>
            <select name="wheels" value={formData.wheels} onChange={handleChange} required>
              <option value="">Select Wheels</option>
              {data.wheelsOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name} (${option.price})
                </option>
              ))}
            </select>
          </div>

          <p className="price-display">Total Price: ${totalPrice}</p>

          <button type="submit" className="submit-btn">
            Create Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCar;
