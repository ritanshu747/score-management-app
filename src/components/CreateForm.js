import React, { useState } from 'react';
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateForm = ({ open, onClose, onAddPlayer }) => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    score: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.country || !formData.score) {
      toast.error('Please fill in all required fields');
      return;
    }

    onAddPlayer(formData);
    setFormData({ name: '', country: '', score: '' });
    toast.success('Player added successfully');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Create Player</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country"
              variant="outlined"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Score"
              variant="outlined"
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateForm;
