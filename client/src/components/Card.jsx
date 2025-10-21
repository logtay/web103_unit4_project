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
        <strong>Exterior:</strong> {car.exterior}<br /> <strong>Interior:</strong> {car.interior}<br /> <strong>Roof:</strong> {car.convertible ? 'N/A' : car.roof}<br /> <strong>Wheels:</strong> {car.wheels}<br />
        {car.convertible && <strong>Is Convertible</strong>}
      </p>
      <p><Link to={`/items/${car.id}`}><button>Details</button></Link></p>
    </div>
  );
};

export default Card;