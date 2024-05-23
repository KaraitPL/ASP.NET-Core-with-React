﻿import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KontaktAdd = ({ handleAddContact }) => {
    const [imie, setImie] = useState('');
    const [nazwisko, setNazwisko] = useState('');
    const [email, setEmail] = useState('');
    const [haslo, setHaslo] = useState('');
    const [telefon, setTelefon] = useState('');
    const [kategoria, setKategoria] = useState('');
    const [podkategoria, setPodkategoria] = useState('');
    const [dataUrodzenia, setDataUrodzenia] = useState('');
    const [kategorie, setKategorie] = useState([]);
    const [podkategorie, setPodkategorie] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Pobierz kategorie z bazy danych lub z innego źródła danych
        fetchCategories();
        fetchSubcategories();
    }, []);

    const fetchCategories = async () => {
        try {
            // Przykładowe pobranie kategorii z API
            const response = await fetch('/api/kategoria/GetCategories');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setKategorie(data); // Ustaw listę kategorii
        } catch (error) {
            console.error('Błąd podczas pobierania kategorii:', error);
        }
    };

    const fetchSubcategories = async () => {
        try {
            // Przykładowe pobranie kategorii z API
            const response = await fetch('/api/podkategoria/GetSubcategories');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPodkategorie(data); // Ustaw listę kategorii
        } catch (error) {
            console.error('Błąd podczas pobierania podkategorii:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const PL = {
                imie: imie,
                nazwisko: nazwisko,
                email: email,
                haslo: haslo,
                telefon: telefon,
                kategoria: kategoria,
                podkategoria: kategoria === "Prywatny" ? "" : podkategoria,
                dataUrodzenia: dataUrodzenia
            };

            const response = await fetch('/api/kontakt/AddContact', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(PL)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            navigate(`/`);
            // Jeśli dodanie kontaktu było udane, wywołaj funkcję handleAddContact
            handleAddContact(responseData); // Załóżmy, że serwer zwraca zaktualizowany kontakt
            // Wyczyść formularz po dodaniu kontaktu
            setImie('');
            setNazwisko('');
            setEmail('');
            setHaslo('');
            setKategoria('');
            setPodkategoria('');
            setTelefon('');
            setDataUrodzenia('');
        } catch (error) {
            console.error('Błąd podczas dodawania kontaktu:', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '20px' }}>Dodaj nowy kontakt</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
                <div>
                    <label style={{ display: 'block' }}>Imię:</label>
                    <input
                        type="text"
                        value={imie}
                        onChange={(e) => setImie(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block' }}>Nazwisko:</label>
                    <input
                        type="text"
                        value={nazwisko}
                        onChange={(e) => setNazwisko(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block' }}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block' }}>Hasło:</label>
                    <input
                        type="text"
                        value={haslo}
                        onChange={(e) => setHaslo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block' }}>Kategoria:</label>
                    <select
                        value={kategoria}
                        onChange={(e) => setKategoria(e.target.value)}
                        required
                    >
                        <option value="">Wybierz kategorię</option>
                        {kategorie.map((kat) => (
                            <option key={kat.id} value={kat.nazwa}>{kat.nazwa}</option>
                        ))}
                    </select>
                </div>
                {kategoria === "Inny" && (
                    <div>
                        <label style={{ display: 'block' }}>Podkategoria:</label>
                        <input
                            type="text"
                            value={podkategoria}
                            onChange={(e) => setPodkategoria(e.target.value)}
                            required
                        />
                    </div>
                )}
                {kategoria === "Sluzbowy" && (
                    <div>
                    <label style={{ display: 'block' }}>Podkategoria:</label>
                        <select
                            value={podkategoria}
                            onChange={(e) => setPodkategoria(e.target.value)}
                            required
                        >
                            <option value="">Wybierz podkategorię</option>
                            {podkategorie.map((subcat) => (
                                <option key={subcat.id} value={subcat.nazwa}>{subcat.nazwa}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <label style={{ display: 'block' }}>Data Urodzenia:</label>
                    <input
                        type="date"
                        value={dataUrodzenia}
                        onChange={(e) => setDataUrodzenia(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block' }}>Telefon:</label>
                    <input
                        type="tel"
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ marginTop: '20px' }}>Dodaj kontakt</button>
            </form>
        </div>
    );
};

export default KontaktAdd;