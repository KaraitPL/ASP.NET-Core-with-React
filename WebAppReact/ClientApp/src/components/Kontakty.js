import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importujemy hook do nawigacji
import { Link } from 'react-router-dom'; // Importujemy komponent Link do obsługi nawigacji
import authService from './api-authorization/AuthorizeService'; // Importujemy moduł do autoryzacji

const Kontakty = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetchContacts();
        checkLoginStatus();
    }, []);

    // Funkcja sprawdzająca status zalogowania użytkownika
    const checkLoginStatus = async () => {
        const user = await authService.getUser();
        setLoggedIn(!!user);
    };

    // Funkcja pobierająca kontakty z serwera
    const fetchContacts = () => {
        fetch('/api/kontakt/GetContacts') // Wywołanie endpointu API do pobrania kontaktów
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

    // Funkcja obsługująca usuwanie kontaktu
    const handleDeleteContact = (id) => {
        if (loggedIn) {
            fetch(`/api/kontakt/DeleteContact/${id}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    setItems(items.filter((item) => item.id !== id));
                })
                .catch((error) => console.error('Error deleting contact:', error));
        } else {
            navigate(`/authentication/login`); // Przekierowanie do strony logowania w przypadku braku zalogowania
        }
    };

    // Funkcja obsługująca edycję kontaktu
    const handleEditContact = (id) => {
        if (loggedIn) {
            navigate(`/kontakt/edit/${id}`); // Przekierowanie do formularza edycji kontaktu
        } else {
            navigate(`/authentication/login`); // Przekierowanie do strony logowania w przypadku braku zalogowania
        }
    };

    // Funkcja obsługująca wyświetlanie szczegółów kontaktu
    const handleDetailContact = (id) => {
        if (loggedIn) {
            navigate(`/kontakt/${id}`); // Przekierowanie do strony ze szczegółami kontaktu
        } else {
            navigate(`/authentication/login`); // Przekierowanie do strony logowania w przypadku braku zalogowania
        }
    };

    return (
        <main>
            <h3>Lista Kontaktów</h3>
            {items.length > 0 ? (
                <div>
                    {/* Wyświetlanie tabeli z listą kontaktów */}
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
                            {/* Mapowanie listy kontaktów do wierszy tabeli */}
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.imie}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.nazwisko}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.email}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {/* Przyciski do usuwania, edycji i wyświetlania szczegółów kontaktu */}
                                        <button onClick={() => handleDeleteContact(item.id)}>Usuń</button>
                                        <button onClick={() => handleDetailContact(item.id)}>Szczegóły</button>
                                        <button onClick={() => handleEditContact(item.id)}>Edytuj</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Loading...</div> // Komunikat ładowania, jeśli lista kontaktów jest pusta lub nie została jeszcze pobrana
            )}
            <div><Link to="/dodaj-kontakt">Dodaj nowy kontakt</Link> {/* Link do formularza dodawania nowego kontaktu */}</div>
        </main>
    );
};

export default Kontakty;