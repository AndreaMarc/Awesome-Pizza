import api from '../api';

export const getAllPizzas = async () => {
  try {
    const response = await api.get('/api/pizzas');
    return response.data;
  } catch (error) {
    console.error('Errore durante il recupero delle pizze:', error);
    throw error;
  }
};

export const createPizza = async (pizza) => {
  try {
    const response = await api.post('/api/pizzas', pizza);
    return response.data;
  } catch (error) {
    console.error('Errore durante la creazione della pizza:', error);
    throw error;
  }
};

export const updatePizza = async (id, pizzaDetails) => {
  try {
    const response = await api.put(`/api/pizzas/${id}`, pizzaDetails);
    return response.data;
  } catch (error) {
    console.error('Errore durante l\'aggiornamento della pizza:', error);
    throw error;
  }
};

export const deletePizza = async (id) => {
  try {
    const response = await api.delete(`/api/pizzas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Errore durante la cancellazione della pizza:', error);
    throw error;
  }
};
