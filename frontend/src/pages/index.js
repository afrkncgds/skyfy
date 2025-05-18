import { useState } from 'react';

export default function Home() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`http://localhost:5000/api/flights?from=${from}&to=${to}&date=${date}`);
            const data = await res.json();
            setFlights(data);
        } catch (err) {
            console.error('Hata:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Uçuş Ara</h1>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Nereden (örn. IST)"
                    value={from}
                    onChange={(e) => setFrom(e.target.value.toUpperCase())}
                    required
                />
                <input
                    type="text"
                    placeholder="Nereye (örn. LHR)"
                    value={to}
                    onChange={(e) => setTo(e.target.value.toUpperCase())}
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Aranıyor...' : 'Ara'}
                </button>
            </form>

            <section>
                <h2>Uçuş Sonuçları:</h2>
                {flights.length === 0 ? (
                    <p>Henüz sonuç yok.</p>
                ) : (
                    <ul>
                        {flights.map((flight) => (
                            <li key={flight.id}>
                                {flight.from} → {flight.to} | {flight.date} | {flight.price}₺
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
