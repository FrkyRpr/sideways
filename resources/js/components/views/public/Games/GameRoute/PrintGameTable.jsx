import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrintGameTable = ({ setShowPrintTab }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('/api/game');
                setGames(response.data.game);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchGames();
    }, []);

    const handlePrint = () => {
        const printWindow = window.open('', '', 'width=800,height=600');
        
        const htmlContent = `
            <html>
                <head>
                    <title>Game List</title>
                    <style>
                        table { width: 100%; border-collapse: collapse; }
                        th, td { padding: 10px; text-align: left; border: 1px solid black; }
                        th { background-color: #48a860; color: white; }
                    </style>
                </head>
                <body>
                    <h1>Game List</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Game Name</th>
                                <th>Genre</th>
                                <th>Developer</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${games.map(game => `
                                <tr>
                                    <td>${game.name}</td>
                                    <td>${game.genre}</td>
                                    <td>${game.developer}</td>
                                    <td>${game.rating}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;
    
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        printWindow.onafterprint = () => {
            printWindow.close();
            setShowPrintTab(false);
        };
        
        printWindow.print();
    };
    

    return (
        <button onClick={handlePrint} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', margin: '10px' }}>
            Print Game List
        </button>
    );
};

export default PrintGameTable;
