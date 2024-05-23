import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Kontakty = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        fetch('/api/kontakt/GetContacts')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setItems(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    };

    const handleDeleteContact = (id) => {
        fetch(`/api/kontakt/DeleteContact/${id}`, {
            method: 'DELETE',
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

    const handleDetailContact = (id) => {
        navigate(`/kontakt/${id}`);
    };


    return (
        <main>
            <h3>Lista Kontaktów</h3>
            {items.length > 0 ? (
                <div>
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
                                        <button onClick={() => handleDetailContact(item.id)}>Szczegóły</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/dodaj-kontakt">Dodaj nowy kontakt</Link>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </main>
    );
};

export default Kontakty;