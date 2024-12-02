import api from '../api';

export const getOrders = async () => {
  try {
    const response = await api.get('/api/orders');
    return response.data;
  } catch (error) {
    console.error("Errore durante il recupero degli ordini:", error);
    throw error;
  }
};

export const getOrdersByStatus = async (id) => {
  try {
    const response = await api.get(`/api/orders/status/2`);
    return response.data;
  } catch (error) {
    console.error(`Errore durante il recupero degli ordini evasi`, error);
    throw error;
  }
};



export const createOrder = async (newOrder) => {
  try {
    const response = await api.post('/api/orders/create', newOrder);

    return response.data;
  } catch (error) {
    console.error('Errore durante la creazione dell\'ordine:', error);
    throw error;
  }
};


export const updateOrderStatus = async (id, status) => {
  try {
    const response = await api.put(`/api/orders/update-status/${id}`, null, {
      params: {
        status: status,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dello stato dell\'ordine:', error);
    throw error;
  }
};

export const updateOrderDetails = async (id, orderDetails) => {
  try {
    const response = await api.put(`/api/orders/${id}`, orderDetails);

    return response.data;
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dell\'ordine:', error);
    throw error;
  }
};


export const deleteOrder = async (id) => {
  try {
    const response = await api.delete(`/api/orders/${id}`);

    return response.data;
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dell\'ordine:', error);
    throw error;
  }
};