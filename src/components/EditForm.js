import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const EditForm = ({ open, onClose, player, onUpdatePlayer }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    country: '',
    score: '',
  });

  useEffect(() => {
    if (player) {
      setFormData({
        id: player.id,
        name: player.name,
        country: player.country,
        score: player.score,
      });
    }
  }, [player]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onUpdatePlayer(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle style={{ textAlign: 'center', background: '#3f51b5', color: '#fff' }}>Edit Player</DialogTitle>
      <DialogContent style={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ padding: '16px', justifyContent: 'center' }}>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginLeft: '8px' }}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
