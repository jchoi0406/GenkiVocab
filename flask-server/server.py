from flask import Flask, jsonify
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import random
app = Flask(__name__)
cred = credentials.Certificate("../genkivocab-firebase-adminsdk-kgcp1-c12bf490e3.json")  # Replace with your service account key
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route("/learn/<int:lesson_number>")
def learn(lesson_number):
    # Assuming the lesson_number corresponds to the lesson document ID in Firestore
    collection_ref = db.collection("lessons").document(f"lesson_{lesson_number}").collection("words")
    documents = list(collection_ref.stream())
    # Sample 4 random documents from the collection
    random_docs = random.sample(documents, 4)
    # Convert the documents to dictionaries
    random_words_data = [doc.to_dict() for doc in random_docs]
    # Return the JSON response
    return jsonify(random_words_data)

if __name__ == "__main__":
    app.run(debug=True)