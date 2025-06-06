import React, { useState } from 'react';
import { useGames, addGame } from './crud/GameManager';
import GamesTable from './GameTable';

const GamesSection = () => {
    const { games, setGames, error } = useGames();
    const [showForm, setShowForm] = useState(false);
    const [newGame, setNewGame] = useState({ name: '', genre: '', developer: '', rating: '' });

    const handleChange = (e) => {
        setNewGame({ ...newGame, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addGame(newGame, setGames);
        setShowForm(false);
        setNewGame({ name: '', genre: '', developer: '', rating: '' }); 
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '100%', margin: 'auto' }}>
            <h1 style={{ fontSize: '24px', paddingBottom: '10px', textAlign: 'center' }}>Game Listings</h1>
            <button 
                onClick={() => setShowForm(!showForm)}
                style={{ 
                    padding: '10px 15px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer', 
                    borderRadius: '5px', 
                    display: 'block', 
                    margin: '10px auto'
                }}
            >
                {showForm ? 'Close Form' : 'Create Game'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} 
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '10px', 
                        background: '#f9f9f9', 
                        padding: '20px', 
                        borderRadius: '8px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                    }}>
                    <input type="text" name="name" placeholder="Game Name" value={newGame.name} onChange={handleChange} required 
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />

                    <input type="text" name="genre" placeholder="Genre" value={newGame.genre} onChange={handleChange} required 
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        
                    <input type="text" name="developer" placeholder="Developer" value={newGame.developer} onChange={handleChange} required 
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <div>
                        <label style={{ marginRight: '10px' }}>Rating:</label>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <label key={value} style={{ marginRight: '10px' }}>
                                <input 
                                    type="radio" 
                                    name="rating" 
                                    value={value} 
                                    checked={newGame.rating === String(value)} 
                                    onChange={handleChange} 
                                    required 
                                />
                                {value}
                            </label>
                        ))}
                    </div>
                    <button type="submit" 
                        style={{ 
                            padding: '10px', 
                            backgroundColor: '#48a860', 
                            color: 'white', 
                            border: 'none', 
                            cursor: 'pointer', 
                            borderRadius: '5px',
                            fontWeight: 'bold'
                        }}>
                        Add Game
                    </button>
                </form>
            )}
            <br />
            <GamesTable games={games} setGames={setGames} />
        </div>
    );
};

export default GamesSection;
