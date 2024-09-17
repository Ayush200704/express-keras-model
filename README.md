# .keras Model Integration with Express.js Backend

This project demonstrates the integration of a machine learning model with an Express.js backend. It uses a Python script for prediction and a Node.js server to expose the model via an API.

## Prerequisites

- Python 3.7+
- Node.js 14+
- npm (usually comes with Node.js)

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/Ayush200704/express-keras-model.git
   cd express-keras-model
   ```

2. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Install Node.js dependencies:
   ```
   npm install
   ```

## Running the Application

### 1. Express.js Server

start the Express.js server:

```
npm run dev
```

The server should start and you'll see a message like "Express server running on port 3000".

## Testing the API

You can test the API using Postman or any HTTP client. Here's how to do it with Postman:

1. Open Postman
2. Create a new POST request
3. Set the URL to `http://localhost:3000/predict` 
4. Set the request body to raw JSON and input the following:

```json
{
  "input": [
    [0.1234, 0.5678, 0.9876, 0.4321, 0.8765, 0.2345, 0.6789, 0.3456, 0.7890, 0.2109,
     0.5432, 0.8901, 0.3210, 0.7654, 0.1098, 0.5437, 0.9812, 0.4356, 0.8709, 0.2143]
  ]
}
```

5. Send the request

You should receive a response with the model's prediction.



