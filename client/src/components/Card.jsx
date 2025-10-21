import { Link } from 'react-router-dom';
import '../css/Card.css';

const Card = ({ car }) => {
  return (
    <div className="card">
      <h3>
        {car.name}
      </h3>
      <p><strong>Price:</strong> ${car.price}</p>
      <p>
        <strong>Exterior:</strong> {car.exterior} <strong>Interior:</strong> {car.interior} <strong>Roof:</strong> {car.roof} <strong>Wheels:</strong> {car.wheels} 
        {car.convertible && ' (Convertible)'}
      </p>
      <p><Link to={`/items/${car.id}`}><button>Details</button></Link></p>
    </div>
  );
};

export default Card;