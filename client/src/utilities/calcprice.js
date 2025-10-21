import * as data from '../carData.js';

export const calculatePrice = (formData) => {
  let total = 25000; 

  const convertible = data.convertibleOptions.find(opt => opt.name === formData.convertible);
  if (convertible) total += convertible.price;

  const exterior = data.exteriorOptions.find(opt => opt.name === formData.exterior);
  if (exterior) total += exterior.price;

  const interior = data.interiorOptions.find(opt => opt.name === formData.interior);
  if (interior) total += interior.price;

  const roof = data.roofOptions.find(opt => opt.name === formData.roof);
  if (roof) total += roof.price;

  const wheels = data.wheelsOptions.find(opt => opt.name === formData.wheels);
  if (wheels) total += wheels.price;

  return total;
};
