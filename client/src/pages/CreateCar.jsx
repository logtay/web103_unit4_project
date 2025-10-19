import '../App.css'
import { useState } from 'react';
import { createCar } from '/services/CarsAPI.jsx';
import * as data from '../carData.js';



const CreateCar = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newCar = await createCar(formData);
            console.log('Car created successfully:', newCar);
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
            <button type="submit">Create Car</button>
        </form> 
        </div>
    )   
}

export default CreateCar