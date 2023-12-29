import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import RandomPlayerDialog from './components/RandomPlayerDialog';
import axios from 'axios';

const App = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [isRandomPlayerVisible, setRandomPlayerVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleButtonClick = () => {
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  const handleEditFormClose = () => {
    setEditFormVisible(false);
    setSelectedPlayerId(null);
    setSelectedPlayer(null);
  };

  const handleRandomPlayerClose = () => {
    setRandomPlayerVisible(false);
  };

  const handleAddPlayer = async (newPlayer) => {
    try {
      const response = await axios.post('http://localhost:8000/players', newPlayer);
      setTableData([...tableData, response.data]);
    } catch (error) {
      console.error('Error adding player:', error);
    }

    handleCloseForm();
  };

  const handleEdit = (id) => {
    const playerToEdit = tableData.find((player) => player.id === id);
    setSelectedPlayerId(id);
    setSelectedPlayer(playerToEdit);
    setEditFormVisible(true);
  };

  const handleUpdatePlayer = (updatedPlayer) => {
    setTableData((prevData) =>
      prevData.map((player) => (player.id === updatedPlayer.id ? updatedPlayer : player))
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/players/${id}`);
      setTableData((prevData) => prevData.filter((player) => player.id !== id));
    } catch (error) {
      console.error(`Error deleting player with ID ${id}:`, error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterPlayersByScore(query);
  };

  const filterPlayersByScore = (query) => {
    const filteredPlayers = tableData.filter(
      (player) => player.score.toString().includes(query) || query === ''
    );
    setFilteredTableData(filteredPlayers);
  };

  const handleFetchRandomPlayer = async () => {
    try {
      const response = await axios.get('http://localhost:8000/players/random');
      setSelectedPlayer(response.data);
      setRandomPlayerVisible(true);
    } catch (error) {
      console.error('Error fetching random player:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/players');
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <Button variant="contained" color="primary" onClick={handleButtonClick} style={{ marginBottom: '10px' }}>
          Add Player
        </Button>
        <Button variant="contained" color="primary" onClick={handleFetchRandomPlayer} style={{ marginLeft: '10px', marginBottom: '10px' }}>
          Fetch Random Player
        </Button>
        <TextField
          label="Search by Score"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginLeft: '10px', marginBottom: '10px' }}
        />
        <CreateForm open={isFormVisible} onClose={handleCloseForm} onAddPlayer={handleAddPlayer} />
        <EditForm
          open={isEditFormVisible}
          onClose={handleEditFormClose}
          player={selectedPlayer}
          onUpdatePlayer={handleUpdatePlayer}
        />
        <RandomPlayerDialog open={isRandomPlayerVisible} onClose={handleRandomPlayerClose} player={selectedPlayer} />
        <TableContainer component={Paper} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', marginTop: '10px' }}>
          <Table aria-label="simple table" style={{ minWidth: 650 }}>
            <TableHead style={{ background: '#f1f1f1' }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTableData.length > 0
                ? filteredTableData.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.country}</TableCell>
                      <TableCell>{player.score}</TableCell>
                      <TableCell>
                        <EditIcon color="primary" style={{ cursor: 'pointer' }} onClick={() => handleEdit(player.id)} />
                        <DeleteIcon color="secondary" style={{ cursor: 'pointer' }} onClick={() => handleDelete(player.id)} />
                      </TableCell>
                    </TableRow>
                  ))
                : tableData.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.country}</TableCell>
                      <TableCell>{player.score}</TableCell>
                      <TableCell>
                        <EditIcon color="primary" style={{ cursor: 'pointer' }} onClick={() => handleEdit(player.id)} />
                        <DeleteIcon color="secondary" style={{ cursor: 'pointer' }} onClick={() => handleDelete(player.id)} />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default App;
