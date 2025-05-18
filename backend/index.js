const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const mockFlights = [
    { id: 1, from: 'IST', to: 'LHR', date: '2025-06-01', price: 2500 },
    { id: 2, from: 'IST', to: 'CDG', date: '2025-06-01', price: 2700 },
];

app.get('/api/flights', (req, res) => {
    const { from, to, date } = req.query;
    const result = mockFlights.filter(f => f.from === from && f.to === to && f.date === date);
    res.json(result);
});

app.post('/api/booking', (req, res) => {
    const { flightId, user } = req.body;
    res.status(201).json({ message: 'Booking successful', bookingId: Math.random().toString(36).substring(2) });
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
