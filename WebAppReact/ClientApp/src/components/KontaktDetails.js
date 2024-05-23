import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../utils/utils';

const KontaktDetails = () => {
    // Pobranie parametru ID z adresu URL za pomocą hooka useParams
    const { id } = useParams();

    const [contact, setContact] = useState(null);

    useEffect(() => {
        fetchContactDetails(id);
    }, [id]);

    // Funkcja do pobierania szczegółów kontaktu z serwera
    const fetchContactDetails = (id) => {
        fetch(`/api/kontakt/GetContact/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setContact(data);
            })
            .catch((error) => console.error('Error fetching contact details:', error));
    };

    // Renderowanie danych kontaktu lub informacji o ładowaniu
    return (
        <div>
            {contact ? (
                <div>
                    <h3>Szczegóły kontaktu</h3>
                    {/* Wyświetlanie danych kontaktu */}
                    <p><strong>Imię:</strong> {contact.imie}</p>
                    <p><strong>Nazwisko:</strong> {contact.nazwisko}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Hasło:</strong> {contact.haslo}</p>
                    <p><strong>Kategoria:</strong> {contact.kategoria}</p>
                    {/* Wyświetlanie podkategorii, jeśli istnieje */}
                    {contact.podkategoria && (
                        <p><strong>Podkategoria:</strong> {contact.podkategoria}</p>
                    )}
                    <p><strong>Telefon:</strong> {contact.telefon}</p>
                    {/* Formatowanie i wyświetlanie daty urodzenia */}
                    <p><strong>Data urodzenia:</strong> {formatDate(contact.dataUrodzenia)}</p>
                </div>
            ) : (
                <div>Loading...</div> // Komunikat informujący o ładowaniu danych
            )}
        </div>
    );
};

export default KontaktDetails;