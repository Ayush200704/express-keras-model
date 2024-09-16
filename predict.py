from flask import Flask, request, jsonify # type: ignore
import numpy as np # type: ignore
from tensorflow import keras # type: ignore


app = Flask(__name__)

# Load the Keras model
model = keras.models.load_model('simple_keras_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = np.array(data['input'])
    prediction = model.predict(input_data)
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(port=5000)