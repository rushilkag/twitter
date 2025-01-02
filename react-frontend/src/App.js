import React, { useEffect, useState } from 'react';
import TweetList from './TweetList';

// Adjust this if your Flask server runs on a different hostname/port
const API_BASE_URL = 'http://127.0.0.1:5000';

function App() {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');

  // Fetch tweets on component mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/tweets`)
      .then(response => response.json())
      .then(data => {
        setTweets(data);
      })
      .catch(error => {
        console.error('Error fetching tweets:', error);
      });
  }, []);

  // Function to submit new tweet
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTweet.trim()) return;

    fetch(`${API_BASE_URL}/tweets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newTweet })
    })
    .then(response => response.json())
    .then(createdTweet => {
      // Prepend new tweet to the timeline
      setTweets([createdTweet, ...tweets]);
      setNewTweet('');
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h1 className="text-center mb-4">Twitter Clone</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">What's happening?</label>
          <textarea
            className="form-control"
            rows="3"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            placeholder="Write your tweet here..."
          />
        </div>
        <button className="btn btn-primary" type="submit">Tweet</button>
      </form>

      <TweetList tweets={tweets} />
    </div>
  );
}

export default App;
