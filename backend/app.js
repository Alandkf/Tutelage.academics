const express = require('express');
const cors = require('cors');

const app = express();

// Middleware to enable CORS
app.use(cors());

const NEXT_PUBLIC_API_URL = 'http://localhost:3000'; // Replace with your Next.js app URL

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.get('/first', (req, res) => {
    res.json({ message: `1st: Contacting Next.js at ${NEXT_PUBLIC_API_URL}` });
});

app.get('/second', (req, res) => {
    res.json({ message: `2nd: Contacting Next.js at ${NEXT_PUBLIC_API_URL}` });
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});