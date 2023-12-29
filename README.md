# Player Management System

## Overview

This project is a Player Management System that allows users to add, edit, delete, and view player information. It consists of a frontend built with React and Material-UI and a backend implemented using Node.js and Express.

## Features

1. **Create Player:** Allow users to add a new player with a form (Name, Country, Score).
2. **Update Player Details:** Enable users to update the name and score of an existing player.
3. **Delete Player:** Provide functionality to delete a player from the system.
4. **Get Player by Rank:** Fetch a player based on their rank.
5. **Get Random Player:** Display a randomly fetched player.

## Frontend

The frontend is built using React, Material-UI for UI components, and Axios for handling HTTP requests. The key components include:

- **App:** The main component that orchestrates the application's structure.
- **CreateForm:** Component for adding new players.
- **EditForm:** Component for editing existing player details.
- **RandomPlayerDialog:** Component for displaying details of a randomly fetched player.

## Backend

The backend is implemented using Node.js and Express. It provides RESTful API endpoints for managing player data, including:

- `POST /players`: Create a new player.
- `PUT /players/:id`: Update an existing player by ID.
- `DELETE /players/:id`: Delete a player by ID.
- `GET /players`: Retrieve all players sorted by score.
- `GET /players/rank/:val`: Get a player based on their rank.
- `GET /players/random`: Get a randomly selected player.

## Setup Instructions

1. **Clone Repository:**
   ```bash
   git clone https://github.com/ritanshu747/score-management-app.git
   cd player-management-system
