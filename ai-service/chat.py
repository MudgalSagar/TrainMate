from flask import request, jsonify, Flask
import pickle
import json
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import random
from flask_cors import CORS

# Load model and encoders
model = load_model("chat_model.h5")

with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

with open("label_encoder.pkl", "rb") as f:
    lbl_encoder = pickle.load(f)

# Load intents
with open("intents.json") as file:
    intents = json.load(file)

max_len = 20  # should match what you used in training

def predict_class(sentence):
    seq = tokenizer.texts_to_sequences([sentence])
    padded = pad_sequences(seq, truncating="post", maxlen=max_len)
    pred = model.predict(padded)[0]

    intent_index = np.argmax(pred)
    confidence = pred[intent_index]

    if confidence < 0.25:  # same threshold as before
        return None, confidence

    intent = lbl_encoder.inverse_transform([intent_index])[0]
    return intent, confidence

def get_response(intent):
    if not intent:
        return "I didn't understand, can you rephrase?"
    for i in intents["intents"]:
        if i["tag"] == intent:
            return random.choice(i["responses"])
    return "Sorry, I don’t know how to respond."

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    intent, confidence = predict_class(user_message)
    reply = get_response(intent)
    return jsonify({"reply": reply, "confidence": float(confidence)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
