import { useEffect, useState } from 'react';
import { getAllCars } from '/services/CarsAPI.jsx';
import { Link } from 'react-router-dom';


const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p>Loading cars...</p>;

  return (
    <div>
      <h2>All Cars</h2>
      {cars.length === 0 ? (
        <p>No cars available.</p>
      ) : (
        <ul>
          {cars.map(car => (
            <li key={car.id}>
              <Link to={`/items/${car.id}`}><strong>{car.name}</strong></Link> - ${car.price} - {car.exterior}/{car.interior}/{car.roof}/{car.wheels} {car.convertible ? '(Convertible)' : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewCars;
