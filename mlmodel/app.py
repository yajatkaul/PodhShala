from flask import Flask, request, jsonify
from flask_cors import CORS
from mlmodel.cropmodel import GuessCrop

app = Flask(__name__)

CORS(app, resources={r"/crop-predict": {"origins": "http://localhost:5000"}})

# Define the POST route
@app.route('/crop-predict', methods=['POST'])
def predict():

    data = request.get_json()
    print(data)
    res = GuessCrop(data["nitrogen"], data["phosphorous"],data["pottasium"],data["temperature"],data["humidity"],data["ph"],data["rainfall"])

    response = {
        'result': res,
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
