import React, { useState } from 'react';

const KontaktAdd = ({ handleAddContact }) => {
    const [imie, setImie] = useState('');
    const [nazwisko, setNazwisko] = useState('');
    const [email, setEmail] = useState('');
    const [haslo, setHaslo] = useState('');
    const [telefon, setTelefon] = useState('');
    const [kategoria, setKategoria] = useState('');
    const [podkategoria, setPodkategoria] = useState('');
    const [dataUrodzenia, setDataUrodzenia] = useState('');

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
                podkategoria: podkategoria,
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
        <div>
            <h3>Dodaj nowy kontakt</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Imię:</label>
                    <input type="text" value={imie} onChange={(e) => setImie(e.target.value)} required />
                </div>
                <div>
                    <label>Nazwisko:</label>
                    <input type="text" value={nazwisko} onChange={(e) => setNazwisko(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Hasło:</label>
                    <input type="text" value={haslo} onChange={(e) => setHaslo(e.target.value)} required />
                </div>
                <div>
                    <label>Kategoria:</label>
                    <input type="text" value={kategoria} onChange={(e) => setKategoria(e.target.value)} required />
                </div>
                <div>
                    <label>Podkategoria:</label>
                    <input type="text" value={podkategoria} onChange={(e) => setPodkategoria(e.target.value)} />
                </div>
                <div>
                    <label>Data Urodzenia:</label>
                    <input type="date" value={dataUrodzenia} onChange={(e) => setDataUrodzenia(e.target.value)} required />
                </div>
                <div>
                    <label>Telefon:</label>
                    <input type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} required />
                </div>
                <button type="submit">Dodaj kontakt</button>
            </form>
        </div>
    );
};

export default KontaktAdd;