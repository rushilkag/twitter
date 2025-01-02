import React from 'react';

const TweetList = ({ tweets }) => {
  return (
    <div className="tweet-list">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">{tweet.content}</p>
            <small className="text-muted">
              {new Date(tweet.timestamp * 1000).toLocaleString()}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetList;
