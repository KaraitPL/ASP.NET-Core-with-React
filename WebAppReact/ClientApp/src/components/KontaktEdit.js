import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Funkcja pomocnicza do formatowania daty
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Dodaj 1, ponieważ miesiące są zerowane
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const KontaktEdit = () => {
    // Pobranie parametru ID z adresu URL za pomocą hooka useParams
    const { id } = useParams();

    const [contact, setContact] = useState(null);
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

    const [passwordError, setPasswordError] = useState('');

    const [emailError, setEmailError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
        fetchContactDetails(id);
    }, [id]);

    // Funkcja do pobierania szczegółów kontaktu z serwera
    const fetchContactDetails = async (id) => {
        try {
            const response = await fetch(`/api/kontakt/GetContact/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setContact(data);
            setImie(data.imie);
            setNazwisko(data.nazwisko);
            setEmail(data.email);
            setHaslo(data.haslo);
            setTelefon(data.telefon);
            setKategoria(data.kategoria);
            setPodkategoria(data.podkategoria);
            setDataUrodzenia((formatDate(data.dataUrodzenia)));
        } catch (error) {
            console.error('Error fetching contact details:', error);
        }
    };

    // Funkcja do pobierania kategorii z serwera
    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/kategoria/GetCategories');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setKategorie(data);
        } catch (error) {
            console.error('Błąd podczas pobierania kategorii:', error);
        }
    };

    // Funkcja do pobierania podkategorii z serwera
    const fetchSubcategories = async () => {
        try {
            const response = await fetch('/api/podkategoria/GetSubcategories');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPodkategorie(data);
        } catch (error) {
            console.error('Błąd podczas pobierania podkategorii:', error);
        }
    };

    // Funkcja obsługująca wysłanie formularza
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sprawdzenie hasła pod kątem spełnienia wymagań
            if (!isPasswordValid(haslo)) {
                throw new Error('Hasło musi zawierać co najmniej 8 znaków, jedną dużą literę, jedną cyfrę i jeden znak specjalny.');
            }

            const updatedContact = {
                id: contact.id,
                imie: imie,
                nazwisko: nazwisko,
                email: email,
                haslo: haslo,
                telefon: telefon,
                kategoria: kategoria,
                podkategoria: kategoria === "Prywatny" ? "" : podkategoria,
                dataUrodzenia: dataUrodzenia
            };

            // Wysłanie danych do serwera w celu edycji kontaktu
            const response = await fetch(`/api/kontakt/EditContact/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedContact)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            navigate(`/`);
        } catch (error) {
            console.error('Błąd podczas edycji kontaktu:', error);
            // Obsługa błędów podczas edycji kontaktu
            if (error.message.includes('Hasło')) {
                setPasswordError(error.message); // Ustawienie komunikatu o błędzie hasła
            } else {
                setEmailError('Adres e-mail jest już zajęty.');
            }
        }
    };

    // Funkcja pomocnicza do sprawdzania hasła
    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    // Renderowanie formularza edycji kontaktu
    return (
        <div style={{ maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '20px' }}>Edytuj kontakt</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
                <div>
                    <label style={{ display: 'block' }}>Imię:</label>
                    <input
                        type="text"
                        value={imie}
                        onChange={(e) => setImie(e.target.value)}
                        required
                    /></div>
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
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(''); // Resetowanie komunikatu o błędzie przy zmianie adresu e-mail
                        }}
                        required
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>} {/* Wyświetlanie komunikatu o błędzie */}
                </div>
                <div>
                    <label style={{ display: 'block' }}>Hasło:</label>
                    <input
                        type="text"
                        value={haslo}
                        onChange={(e) => setHaslo(e.target.value)}
                        required
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>} {/* Wyświetlanie komunikatu o błędzie hasła */}
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
                <button type="submit" style={{ marginTop: '20px' }}>Zapisz zmiany</button>
            </form>
        </div>
    );
};

export default KontaktEdit;