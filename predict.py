import sys
import os
import json
import numpy as np
import tensorflow as tf

# Suppress TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # FATAL
tf.get_logger().setLevel('ERROR')

# Suppress warnings
import warnings
warnings.filterwarnings('ignore')

# Load the pre-trained model
model = tf.keras.models.load_model('simple_keras_model.h5', compile=False)

def predict(input_data):
    # Convert input data to numpy array
    input_array = np.array(input_data)
    
    # Make prediction
    predictions = model.predict(input_array, verbose=0)
    
    # Convert predictions to a list of floats
    return predictions.tolist()

if __name__ == "__main__":
    try:
        # Redirect stderr to devnull to suppress TensorFlow messages
        stderr = sys.stderr
        sys.stderr = open(os.devnull, 'w')
        
        # Read input from command line argument
        input_json = sys.argv[1]
        input_data = json.loads(input_json)['input']
        
        # Perform prediction
        results = predict(input_data)
        
        # Print the results as JSON to stdout
        print(json.dumps({"results": results}))
        
        # Restore stderr
        sys.stderr = stderr
    except Exception as e:
        # If there were any errors, print them as JSON to stdout
        print(json.dumps({"error": str(e)}))
        sys.exit(1)