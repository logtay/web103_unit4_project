import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById } from '/services/CarsAPI.jsx';
import '../css/Card.css';

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
    <div className="cards-container">
      <div className="card card-details">
        <h2>{car.name}</h2>
        <p><strong>Price:</strong> ${car.price}</p>
      <p>
        <strong>Exterior:</strong> {car.exterior}<br /> <strong>Interior:</strong> {car.interior}<br /> <strong>Roof:</strong> {car.convertible ? 'N/A' : car.roof}<br /> <strong>Wheels:</strong> {car.wheels}<br />
        {car.convertible && <strong>Is Convertible</strong>}
      </p>
        <div className="button-group">
          <button onClick={() => navigate(`/edit/${car.id}`)}>Edit Car</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
