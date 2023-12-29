import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const RandomPlayerDialog = ({ open, onClose, player }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle style={{ textAlign: 'center', background: '#3f51b5', color: '#fff' }}>Random Player</DialogTitle>
      <DialogContent style={{ padding: '20px' }}>
        {player ? (
          <>
            <Typography variant="body1" style={{ marginBottom: '8px' }}>
              Name: {player.name}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '8px' }}>
              Country: {player.country}
            </Typography>
            <Typography variant="body1">Score: {player.score}</Typography>
          </>
        ) : (
          <Typography variant="body1">No random player available</Typography>
        )}
      </DialogContent>
      <DialogActions style={{ padding: '16px', justifyContent: 'center' }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RandomPlayerDialog;
