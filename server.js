const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const scriptPath = path.resolve(__dirname, 'predict.py');

app.post('/predict', (req, res) => {
    const inputData = req.body.input;

    if (!Array.isArray(inputData) || !Array.isArray(inputData[0])) {
        return res.status(400).json({ error: 'Invalid input format' });
    }

    const options = {
        mode: 'json',
        pythonPath: 'python', // Adjust if necessary
        scriptPath: path.dirname(scriptPath),
        args: [JSON.stringify({ input: inputData })]
    };

    PythonShell.run(path.basename(scriptPath), options)
        .then(results => {
            if (results && results.length > 0) {
                const result = results[0];
                if (result.error) {
                    throw new Error(result.error);
                }
                res.json(result);
            } else {
                res.status(500).json({ error: 'No result from Python script' });
            }
        })
        .catch(err => {
            console.error('Python Error:', err);
            res.status(500).json({ error: 'An error occurred while processing the request', details: err.message });
        });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});