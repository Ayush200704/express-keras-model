const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PYTHON_SERVER_URL = 'http://localhost:5000/predict';

app.post('/predict', async (req, res) => {
    try {
        const response = await axios.post(PYTHON_SERVER_URL, {
            input: req.body.input
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});