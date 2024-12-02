import React, { useState, useEffect } from 'react';
import { getAllPizzas, createPizza, updatePizza, deletePizza } from '../services/PizzaService';
import { TextField, Button, Grid, Typography, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Alert } from '@mui/material';

const Pizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [newPizza, setNewPizza] = useState('');
  const [editedPizza, setEditedPizza] = useState({ id: null, description: '' });
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await getAllPizzas();
        setPizzas(data);
      } catch (error) {
        setMessage('Errore durante il recupero delle pizze.');
        setOpenSnackbar(true);
      }
    };
    fetchPizzas();
  }, []);

  const handleCreatePizza = async (e) => {
    e.preventDefault();
    if (!newPizza) {
      return;
    }
    const pizza = { description: newPizza };

    try {
      const createdPizza = await createPizza(pizza);
      setPizzas([...pizzas, createdPizza]);
      setNewPizza('');
      setMessage('Pizza creata con successo!');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Errore durante la creazione della pizza.');
      setOpenSnackbar(true);
    }
  };

  const handleUpdatePizza = async (e) => {
    e.preventDefault();
    if (!editedPizza.description || !editedPizza.id) {
      return;
    }

    try {
      const updatedPizza = await updatePizza(editedPizza.id, { description: editedPizza.description });
      setPizzas(pizzas.map(pizza => pizza.id === updatedPizza.id ? updatedPizza : pizza));
      setEditedPizza({ id: null, description: '' });
      setMessage('Pizza aggiornata con successo!');
      setOpenSnackbar(true);
      setOpenDialog(false);
    } catch (error) {
      setMessage('Errore durante l\'aggiornamento della pizza.');
      setOpenSnackbar(true);
    }
  };

  const handleDeletePizza = async (id) => {
    try {
      await deletePizza(id);
      setPizzas(pizzas.filter(pizza => pizza.id !== id));
      setMessage('Pizza eliminata con successo!');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Errore durante la cancellazione della pizza.');
      setOpenSnackbar(true);
    }
  };

  const handleOpenDialog = (pizza) => {
    setEditedPizza({ id: pizza.id, description: pizza.description });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Gestione Pizze</Typography>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={message.includes("Errore") ? "error" : "success"}>
          {message}
        </Alert>
      </Snackbar>

      {/* Sezione Aggiungi Pizza */}
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6">Aggiungi una nuova pizza</Typography>
          <form onSubmit={handleCreatePizza}>
            <TextField
              label="Descrizione della pizza"
              variant="outlined"
              fullWidth
              value={newPizza}
              onChange={(e) => setNewPizza(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Aggiungi Pizza
            </Button>
          </form>
        </Grid>

        {/* Sezione Lista Pizze con Tabella */}
        <Grid item xs={12}>
          <Typography variant="h6">Lista delle Pizze</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Descrizione</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pizzas.map((pizza) => (
                  <TableRow key={pizza.id}>
                    <TableCell>{pizza.description}</TableCell>
                    <TableCell align="right">
                      {/* Bottone per Modifica */}
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenDialog(pizza)}
                        sx={{ marginRight: 1 }}
                      >
                        Modifica
                      </Button>
                      {/* Bottone per Elimina */}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeletePizza(pizza.id)}
                      >
                        Elimina
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Dialog per Modificare la Pizza */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Modifica Pizza</DialogTitle>
        <DialogContent>
          <TextField
            label="Descrizione della pizza"
            variant="outlined"
            fullWidth
            value={editedPizza.description}
            onChange={(e) => setEditedPizza({ ...editedPizza, description: e.target.value })}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Annulla
          </Button>
          <Button onClick={handleUpdatePizza} color="primary">
            Salva
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Pizza;
