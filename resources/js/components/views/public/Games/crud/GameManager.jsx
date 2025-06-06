import axios from 'axios';
import { useState, useEffect } from 'react';

export const useGames = (onlyTrashed = false) => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const url = onlyTrashed ? '/api/game?only_trashed=1' : '/api/game';
                const response = await axios.get(url);
                setGames(response.data.game);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching games:", error);
            }
        };
        fetchGames();
    }, [onlyTrashed]);

    return { games, setGames, error };
};

// Add a game
export const addGame = async (gameData, setGames) => {
    try {
        await axios.post('/api/game', gameData);
        window.location.reload();
    } catch (error) {
        console.error('Error adding game:', error.response?.data || error.message);
    }
};

// Delete a game
export const deleteGame = async (gameId, setGames) => {
    try {
        await axios.delete(`/api/game/${gameId}`);
        window.location.reload();
    } catch (error) {
        console.error('Error deleting game:', error);
    }
};

// Edit a game
export const editGame = async (gameId, gameData, setGames) => {
    try {
        await axios.put(`/api/game/${gameId}`, gameData, {
            headers: { 'Content-Type': 'application/json' }
        });
        window.location.reload();
    } catch (error) {
        console.error('Error updating game:', error);
    }
};

// Restore a game (updated to use PATCH instead of PUT)
export const restoreGame = async (gameId, setGames) => {
    try {
        const response = await axios.post(`/api/game/${gameId}/restore`);
        if (response.status === 200) {
            setGames(prevGames => prevGames.filter(game => game.id !== gameId));
            window.location.reload();
        }
    } catch (error) {
        console.error("Error restoring game:", error);
    }
};
