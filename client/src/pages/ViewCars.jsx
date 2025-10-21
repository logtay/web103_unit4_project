import { useEffect, useState } from 'react';
import { getAllCars } from '/services/CarsAPI.jsx';
import Card from '../components/Card';

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
      <div className="cards-container">
      <h2>All Cars</h2>
        {cars.length === 0 ? (
          <p>No cars available.</p>
        ) : (
          cars.map(car => <Card key={car.id} car={car} />)
        )}
      </div>
    </div>
  );
};

export default ViewCars;
