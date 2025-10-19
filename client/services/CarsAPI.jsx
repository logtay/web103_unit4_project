export const getAllCars = async () => {
  try {
    const response = await fetch('/api/items');
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

export const getCarById = async (carId) => {
  try {
    const response = await fetch(`/api/items/${carId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch car with ID: ${carId}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching car with ID ${carId}:`, error);
    throw error;
  }
};

export const createCar = async (carData) => {
  try {
    const response = await fetch('/api/items', {
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

export const updateCar = async (carId, carData) => {
  try {
    const response = await fetch(`/api/items/${carId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update car with ID: ${carId}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating car ${carId}:`, error);
    throw error;
  }
};

export const deleteCar = async (carId) => {
  try {
    const response = await fetch(`/api/items/${carId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete car ${carId}`);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting car ${carId}:`, error);
    throw error;
  }
};  
