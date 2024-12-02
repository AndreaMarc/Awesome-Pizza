import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderDetails, createOrder, deleteOrder } from '../services/OrderService'
import { getAllPizzas } from '../services/PizzaService';
import { TextField, Button, Grid, Typography, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Chip } from '@mui/material';
import { Alert } from '@mui/material';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [nickname, setNickname] = useState('');
  const [status, setStatus] = useState('');
  const [selectedPizzas, setSelectedPizzas] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [pizzas, setPizzas] = useState([]);

  const getStatusLabel = (status) => {
    switch(status) {
      case 1:
        return 'In elaborazione';
      case 2:
        return 'In attesa';
      case 3:
        return 'Evaso';
      default:
        return 'Status sconosciuto';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [orderData, pizzaData] = await Promise.all([getOrders(), getAllPizzas()]);
        setOrders(orderData);
        setPizzas(pizzaData);
        setLoading(false);
      } catch (error) {
        setMessage('Errore durante il recupero dei dati.');
        setOpenSnackbar(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
      setMessage('Ordine eliminato con successo!');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Errore durante l\'eliminazione dell\'ordine.');
      setOpenSnackbar(true);
    }
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setNickname(order.nickname);
    setStatus(order.status);
    const pizzaNamesList = order.pizzas.map(pizza => pizza.description);
    setSelectedPizzas(pizzaNamesList);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
    setNickname('');
    setStatus('');
    setSelectedPizzas([]);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
    setNickname('');
    setStatus('');
    setSelectedPizzas([]);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleAddPizza = (pizzaId) => {
    const pizza = pizzas.find(pizza => pizza.id === pizzaId);
    if (pizza && !selectedPizzas.includes(pizza.description)) {
      setSelectedPizzas([...selectedPizzas, pizza.description]);
    }
  };

  const handleRemovePizza = (pizzaName) => {
    setSelectedPizzas(selectedPizzas.filter(pizza => pizza !== pizzaName));
  };

  const handleSaveChanges = async () => {
    if (!nickname || !status || selectedPizzas.length === 0) {
      setMessage('Compila tutti i campi per aggiornare l\'ordine.');
      setOpenSnackbar(true);
      return;
    }

    const pizzaIds = pizzas
      .filter(pizza => selectedPizzas.includes(pizza.description))
      .map(pizza => pizza.id);

    const updatedOrder = {
      ...selectedOrder,
      nickname,
      status,
      pizzas: pizzaIds, 
    };

    try {
      const savedOrder = await updateOrderDetails(selectedOrder.id, updatedOrder);
      setOrders(orders.map(order => (order.id === savedOrder.id ? savedOrder : order)));
      setMessage('Ordine aggiornato con successo!');
      setOpenSnackbar(true);
      handleCloseModal();
    } catch (error) {
      setMessage('Errore durante l\'aggiornamento dell\'ordine.');
      setOpenSnackbar(true);
    }
};


  const handleCreateOrder = async () => {
    if (!nickname || !status || selectedPizzas.length === 0) {
      setMessage('Compila tutti i campi per creare un ordine.');
      setOpenSnackbar(true);
      return;
    }
  
    const pizzaIds = pizzas
      .filter(pizza => selectedPizzas.includes(pizza.description))
      .map(pizza => pizza.id);
  
    if (pizzaIds.length !== selectedPizzas.length) {
      setMessage('Alcuni nomi delle pizze non sono validi.');
      setOpenSnackbar(true);
      return;
    }
  
    try {
      const newOrder = {
        nickname,
        status,
        pizzaIds,
      };
      const createdOrder = await createOrder(newOrder);
      setOrders([...orders, createdOrder]);
      setMessage('Ordine creato con successo!');
      setOpenSnackbar(true);
      handleCloseCreateModal();
    } catch (error) {
      setMessage('Errore durante la creazione dell\'ordine.');
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Gestione Ordini</Typography>

      {/* Snackbar per messaggi di errore o successo */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={message.includes("Errore") ? "error" : "success"}>
          {message}
        </Alert>
      </Snackbar>

      <Button variant="contained" color="primary" onClick={handleOpenCreateModal}>
        Aggiungi Nuovo Ordine
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 4, maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Ordine</TableCell>
              <TableCell>Nickname</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.nickname}</TableCell>
                <TableCell>{getStatusLabel(order.status)}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleOpenModal(order)}>
                    Modifica
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteOrder(order.id)} style={{ marginLeft: 8 }}>
                    Elimina
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />}
      </TableContainer>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Modifica Ordine</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <TextField
                label="Nickname"
                variant="outlined"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value={1}>In elaborazione</MenuItem>
                  <MenuItem value={2}>Completato</MenuItem>
                  <MenuItem value={3}>Annullato</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Pizze</InputLabel>
                <Select
                  value=""
                  onChange={(e) => handleAddPizza(e.target.value)}
                  label="Seleziona Pizze"
                >
                  {pizzas.map((pizza) => (
                    <MenuItem key={pizza.id} value={pizza.id}>{pizza.description}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div style={{ marginTop: 10 }}>
                {selectedPizzas.map((pizzaName, index) => (
                  <Chip
                    key={index}
                    label={pizzaName}
                    onDelete={() => handleRemovePizza(pizzaName)}
                    style={{ marginRight: 8, marginBottom: 8 }}
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Annulla
          </Button>
          <Button onClick={handleSaveChanges} color="secondary">
            Salva modifiche
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCreateModal} onClose={handleCloseCreateModal}>
        <DialogTitle>Crea Nuovo Ordine</DialogTitle>
        <DialogContent>
          <TextField
            label="Nickname"
            variant="outlined"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value={1}>In elaborazione</MenuItem>
              <MenuItem value={2}>Completato</MenuItem>
              <MenuItem value={3}>Annullato</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Pizze</InputLabel>
            <Select
              value=""
              onChange={(e) => handleAddPizza(e.target.value)}
              label="Seleziona Pizze"
            >
              {pizzas.map((pizza) => (
                <MenuItem key={pizza.id} value={pizza.id}>{pizza.description}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <div style={{ marginTop: 10 }}>
            {selectedPizzas.map((pizzaName, index) => (
              <Chip
                key={index}
                label={pizzaName}
                onDelete={() => handleRemovePizza(pizzaName)}
                style={{ marginRight: 8, marginBottom: 8 }}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateModal} color="primary">
            Annulla
          </Button>
          <Button onClick={handleCreateOrder} color="secondary">
            Crea Ordine
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Order;
