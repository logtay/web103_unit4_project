import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById } from '/services/CarsAPI.jsx';

const CarDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCarById(parseInt(id));
        setCar(data);
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <p>Loading car details...</p>;
  if (!car) return <p>Car not found.</p>;

  return (
    <div>
      <h2>{car.name}</h2>
      <p><strong>Price:</strong> ${car.price}</p>
      <p><strong>Exterior:</strong> {car.exterior}</p>
      <p><strong>Interior:</strong> {car.interior}</p>
      <p><strong>Roof:</strong> {car.roof}</p>
      <p><strong>Wheels:</strong> {car.wheels}</p>
      <p><strong>Convertible:</strong> {car.convertible ? 'Yes' : 'No'}</p>

    </div>
  );
};

export default CarDetails;
