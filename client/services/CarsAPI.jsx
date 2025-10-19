export const getAllCars = async () => {
  try {
    const response = await fetch('http://localhost:3000/items');
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const getCarById = async (id) => {
  try {
    const allCars = await getAllCars();
    return allCars.find(car => car.id === id);
  } catch (error) {
    console.error(`Error getting car with ID ${id}:`, error);
    throw error;
  }
};

export const createCar = async (carData) => {
  try {
    const response = await fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error('Failed to create car');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating car:', error);
    throw error;
  }
};
