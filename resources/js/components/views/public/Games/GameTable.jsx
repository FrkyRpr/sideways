import React, { useState } from 'react';
import { deleteGame, editGame, restoreGame } from './crud/GameManager';
import { useGames } from './crud/GameManager';
import PrintGameTable from './GameRoute/PrintGameTable';
import * as XLSX from 'xlsx';
import { DeleteOutlined, EditOutlined, RedoOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';


const GamesTable = ({ games, setGames }) => {
    const { games: activeGames } = useGames(false);
    const { games: archivedGames } = useGames(true);

    const [showConfirm, setShowConfirm] = useState(false);
    const [gameToDelete, setGameToDelete] = useState(null);
    const [editingGameId, setEditingGameId] = useState(null);
    const [editedGame, setEditedGame] = useState({ name: '', genre: '', developer: '', rating: '' });
    const [showArchived, setShowArchived] = useState(false);
    const [selectedGames, setSelectedGames] = useState([]);


    const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
    const [gameToRestore, setGameToRestore] = useState(null);

    // Delete function
    const handleDeleteClick = (gameId) => {
        setGameToDelete(gameId);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        if (gameToDelete) {
            try {
                await deleteGame(gameToDelete, setGames);
                setGames((prevGames) => prevGames.filter(game => game.id !== gameToDelete));
            } catch (error) {
                console.error("Error deleting game:", error);
            } finally {
                setShowConfirm(false);
                setGameToDelete(null);
            }
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setGameToDelete(null);
    };

    const handleCheckboxChange = (gameId) => {
        setSelectedGames((prevSelected) =>
            prevSelected.includes(gameId)
                ? prevSelected.filter(id => id !== gameId)
                : [...prevSelected, gameId]
        );
    };

    const deleteSelectedGames = async () => {
        try {
            await Promise.all(selectedGames.map(id => deleteGame(id, setGames)));
            setGames((prevGames) => prevGames.filter(game => !selectedGames.includes(game.id)));
            setSelectedGames([]);
        } catch (error) {
            console.error("Error deleting selected games:", error);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedGames(games.map(game => game.id));
        } else {
            setSelectedGames([]);
        }
    };



    // Edit function
    const handleEditClick = (game) => {
        setEditingGameId(game.id);
        setEditedGame({ ...game });
    };

    const handleSaveEdit = async () => {
        try {
            await editGame(editingGameId, editedGame, setGames);
            setGames((prevGames) =>
                prevGames.map(game => (game.id === editingGameId ? editedGame : game))
            );
            setEditingGameId(null);
        } catch (error) {
            console.error("Error updating game:", error);
        }
    };

    const cancelEdit = () => {
        setEditingGameId(null);
    };

    // Export CSV
    const exportToExcel = () => {
        const headers = ['ID', 'Name', 'Genre', 'Developer', 'Rating'];
        const data = games.map(game => [game.id, game.name, game.genre, game.developer, game.rating]);
        const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Games');
        XLSX.writeFile(wb, 'games.xlsx');
    };

    // Archive toggle function
    const toggleArchive = () => {
        setShowArchived(prevState => !prevState);
    };

    const handleRestoreClick = (gameId) => {
        setGameToRestore(gameId);
        setShowRestoreConfirm(true);
    };

    const confirmRestore = async () => {
        if (gameToRestore) {
            try {
                await restoreGame(gameToRestore, setGames);
                setGames((prevGames) => [...prevGames, archivedGames.find(game => game.id === gameToRestore)]);
            } catch (error) {
                console.error("Error restoring game:", error);
            } finally {
                setShowRestoreConfirm(false);
                setGameToRestore(null);
            }
        }
    };

    const cancelRestore = () => {
        setShowRestoreConfirm(false);
        setGameToRestore(null);
    };

    return (
        <>
            <PrintGameTable />
            <button onClick={exportToExcel} style={exportButtonStyles}>Export to Excel</button>


            <button onClick={deleteSelectedGames} disabled={selectedGames.length === 0} style={exportButtonStyles}>
                Delete Selected
            </button>


            <button onClick={toggleArchive} style={archiveButtonStyles}>
                {showArchived ? 'Show Main Table' : 'Show Archived Games'}
            </button>

            {!showArchived ? (
                <GameTable 
                    games={activeGames} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteClick} 
                    editingGameId={editingGameId}
                    editedGame={editedGame}
                    onCheckboxChange={handleCheckboxChange}
                    selectedGames={selectedGames}
                    setEditedGame={setEditedGame}
                    handleSaveEdit={handleSaveEdit}
                    cancelEdit={cancelEdit}
                    handleSelectAll={handleSelectAll}
                />
            ) : (
                <ArchivedTable games={archivedGames} onRestore={handleRestoreClick} />
            )}


            {showConfirm && (
                <div style={popupStyles}>
                    <h3>Are you sure you want to delete this game?</h3>
                    <button onClick={confirmDelete} style={deleteButtonStyles}>Yes, Delete</button>
                    <button onClick={cancelDelete} style={cancelButtonStyles}>Cancel</button>
                </div>
            )}

            {showRestoreConfirm && (
                <div style={popupStyles}>
                    <h3>Are you sure you want to restore this game?</h3>
                    <button onClick={confirmRestore} style={restoreButtonStyles}>Yes, Restore</button>
                    <button onClick={cancelRestore} style={cancelButtonStyles}>Cancel</button>
                </div>
            )}

        </>
    );
};

const GameTable = ({ games, onEdit, onDelete, editingGameId, editedGame, setEditedGame, handleSaveEdit, cancelEdit, onCheckboxChange, selectedGames, handleSelectAll }) => (
    <table style={tableStyles}>
        <thead>
            <tr style={headerRowStyles}>
                <th style={{alignItems: "center"}}>
                    <div style={checkboxStyles}>
                        <Checkbox 
                            onChange={handleSelectAll} 
                            checked={selectedGames.length === games.length && games.length > 0}
                            indeterminate={selectedGames.length > 0 && selectedGames.length < games.length}
                        />
                    </div>   
                </th>
                <th>Actions</th>
                <th>Game Name</th>
                <th>Genre</th>
                <th>Developer</th>
                <th>Ratings</th>
            </tr>
        </thead>
        <tbody>
            {games.map((game) => (
                <tr key={game.id}  style={cellStyles}>
                    <td style={{alignItems: "center"}}>
                        <div style={checkboxStyles}>
                            <Checkbox checked={selectedGames.includes(game.id)} onChange={() => onCheckboxChange(game.id)} />
                        </div>
                    </td>
                    <td>
                        {editingGameId === game.id ? (
                            <>
                                {/* <Checkbox checked={selectedGames.includes(game.id)} onChange={() => onCheckboxChange(game.id)} /> */}

                                <Button onClick={handleSaveEdit} style={editButtonStyles} icon={<SaveOutlined />}></Button>
                                <Button onClick={cancelEdit} style={cancelButtonStyles} icon={<RollbackOutlined />}></Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => onEdit(game)} style={editButtonStyles} icon={<EditOutlined />} />
                                <Button onClick={() => onDelete(game.id)} style={deleteButtonStyles} icon={<DeleteOutlined />} />
                            </>
                        )}
                    </td>
                    <td>
                        {editingGameId === game.id ? (
                            <input 
                                type="text" 
                                value={editedGame.name} 
                                onChange={(e) => setEditedGame({ ...editedGame, name: e.target.value })} 
                            />
                        ) : (
                            game.name
                        )}
                    </td>
                    <td>
                        {editingGameId === game.id ? (
                            <input 
                                type="text" 
                                value={editedGame.genre} 
                                onChange={(e) => setEditedGame({ ...editedGame, genre: e.target.value })} 
                            />
                        ) : (
                            game.genre
                        )}
                    </td>
                    <td>
                        {editingGameId === game.id ? (
                            <input 
                                type="text" 
                                value={editedGame.developer} 
                                onChange={(e) => setEditedGame({ ...editedGame, developer: e.target.value })} 
                            />
                        ) : (
                            game.developer
                        )}
                    </td>
                    <td>
                        {editingGameId === game.id ? (
                            <select 
                                value={editedGame.rating} 
                                onChange={(e) => setEditedGame({ ...editedGame, rating: e.target.value })}
                            >
                                {[...Array(5).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            game.rating
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const ArchivedTable = ({ games, onRestore }) => (
    <table style={tableStyles}>
        <thead>
            <tr style={headerRowStyles}>

                <th>Actions</th>
                <th>Game Name</th>
                <th>Genre</th>
                <th>Developer</th>
                <th>Ratings</th>
            </tr>
        </thead>
        <tbody>
            {games.map((game) => (
                <tr key={game.id}  style={cellStyles}>
                    <td>
                        <div style={checkboxStyles}>
                            <Button onClick={() => onRestore(game.id)} style={restoreButtonStyles} icon={<RedoOutlined />}></Button>
                        </div>
                    </td>
                    <td>{game.name}</td>
                    <td>{game.genre}</td>
                    <td>{game.developer}</td>
                    <td>{game.rating}</td>
                    
                </tr>
            ))}
        </tbody>
    </table>
);



const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    border: "1px solid black",
    backgroundColor: "#f3f3f3",
};

const headerRowStyles = {
    backgroundColor: "#48a860",
    color: "white",
    border: "1px solid black", 
};

const cellStyles = {
    border: "1px solid black", 
};

const checkboxStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "8px",
}


const exportButtonStyles = {
    padding: '10px 20px',
    marginBottom: '20px',
    backgroundColor: '#48a860',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginLeft: '10px'
};

const archiveButtonStyles = {
    padding: '10px 20px',
    marginBottom: '20px',
    backgroundColor: '#48a860',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginLeft: '10px'
    
};

const editButtonStyles = {
    padding: '5px 10px',
    marginRight: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
};


const restoreButtonStyles = {
    padding: '5px 10px',
    marginRight: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
};

const deleteButtonStyles = {
    padding: '5px 10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
};

const cancelButtonStyles = {
    padding: '5px 10px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
};

const popupStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center'
};

export default GamesTable;
