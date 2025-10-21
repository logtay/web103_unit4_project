import '../App.css';
import { useState } from 'react';
import { createCar } from '/services/CarsAPI.jsx';
import * as data from '../carData.js';
import { calculatePrice } from '../utilities/calcprice.js';
import { useNavigate } from 'react-router-dom';

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

  // Calculate total price of selected options (not dynamic per change, just sum of current selections)
  const totalPrice = calculatePrice({
    ...formData,
    convertible: formData.convertible ? 'Convertible' : 'Non-Convertible'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carToCreate = {
      ...formData,
      price: totalPrice
    };

    try {
      await createCar(carToCreate);
      console.log('Car created successfully:', carToCreate);
      navigate('/items'); // redirect after creation
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <div>
      <h2>Create a Car</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
        </div>

        <div>
          <label>
            Convertible:
            <input type="checkbox" name="convertible" checked={formData.convertible} onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>
            Exterior:
            <select name="exterior" value={formData.exterior} onChange={handleChange} required>
              <option value="">Select Exterior</option>
              {data.exteriorOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name} (${option.price})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Interior:
            <select name="interior" value={formData.interior} onChange={handleChange} required>
              <option value="">Select Interior</option>
              {data.interiorOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name} (${option.price})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Roof:
            <select name="roof" value={formData.roof} onChange={handleChange} required>
              <option value="">Select Roof</option>
              {data.roofOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name} (${option.price})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Wheels:
            <select name="wheels" value={formData.wheels} onChange={handleChange} required>
              <option value="">Select Wheels</option>
              {data.wheelsOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name} (${option.price})
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Display the total price of all selected features */}
        <p>Total Price: ${totalPrice}</p>

        <button type="submit">Create Car</button>
      </form>
    </div>
  );
};

export default CreateCar;
