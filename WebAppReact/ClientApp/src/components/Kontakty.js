import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService';

const Kontakty = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        fetch('api/kontakt/GetContacts')      
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching data:', error));
    };

    const handleDeleteContact = async (id) => {
        const token = authService.getAccessToken();
        fetch(`api/kontakt/DeleteContact/${id}`, {
            method: 'DELETE',
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Usuń kontakt z listy po usunięciu z bazy danych
                setItems(items.filter((item) => item.id !== id));
            })
            .catch((error) => console.error('Error deleting contact:', error));
    };

    return (
        <main>
            <h3>Lista Kontaktów</h3>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Imie</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Nazwisko</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.imie}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.nazwisko}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.email}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <button onClick={() => handleDeleteContact(item.id)}>Usuń</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
};

export default Kontakty;