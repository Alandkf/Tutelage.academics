const express = require('express');
const cors = require('cors');

const app = express();

// Middleware to enable CORS
app.use(cors());

const NEXT_PUBLIC_API_URL = 'http://localhost:3000'; // Replace with your Next.js app URL

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.get('/next', (req, res) => {
    res.json({ message: `Contacting Next.js at ${NEXT_PUBLIC_API_URL}` });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});