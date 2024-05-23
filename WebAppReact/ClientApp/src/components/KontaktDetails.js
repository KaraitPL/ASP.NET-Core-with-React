import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../utils/utils';

const KontaktDetails = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        fetchContactDetails(id);
    }, [id]);

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



    return (
        <div>
            {contact ? (
                <div>
                    <h3>Szczegóły kontaktu</h3>
                    <p><strong>Imię:</strong> {contact.imie}</p>
                    <p><strong>Nazwisko:</strong> {contact.nazwisko}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Hasło:</strong> {contact.haslo}</p>
                    <p><strong>Kategoria:</strong> {contact.kategoria}</p>
                    {contact.podkategoria && (
                        <p><strong>Podkategoria:</strong> {contact.podkategoria}</p>
                    )}
                    <p><strong>Telefon:</strong> {contact.telefon}</p>
                    <p><strong>Data urodzenia:</strong> {formatDate(contact.dataUrodzenia)}</p>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default KontaktDetails;
