from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)  # Enable CORS so that requests from React (on a different port) will work

# In-memory store of tweets, just for demo purposes
# Each tweet is a dict with 'id', 'content', and 'timestamp'
tweets = []

@app.route("/tweets", methods=["GET"])
def get_tweets():
    """
    Returns the list of tweets in chronological order (newest first).
    """
    # Return tweets reversed by timestamp
    return jsonify(sorted(tweets, key=lambda t: t["timestamp"], reverse=True))

@app.route("/tweets", methods=["POST"])
def post_tweet():
    """
    Creates a new tweet. Expects JSON in the format:
    {
      "content": "This is a new tweet"
    }
    """
    data = request.get_json()
    content = data.get("content", "").strip()
    if not content:
        return jsonify({"error": "Tweet content is required"}), 400
    
    new_tweet = {
        "id": len(tweets) + 1,       # simplistic ID assignment
        "content": content,
        "timestamp": time.time()     # store epoch time
    }
    tweets.append(new_tweet)
    
    return jsonify(new_tweet), 201

if __name__ == "__main__":
    # Run Flask in debug mode
    app.run(debug=True, port=5000)
