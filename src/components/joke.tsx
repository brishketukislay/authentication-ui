import React, { useState } from 'react';
import axios from 'axios';
import http from '../interceptor/axios.interceptor'

const RandomJoke: React.FC = () => {
  const [joke, setJoke] = useState<{setup: string; punchline: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
     const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      setJoke(response.data);
    } catch (err) {
      setError('Failed to fetch joke.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchJoke} disabled={loading}>
        {loading ? 'Loading...' : 'Get Random Joke'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}

      {joke && (
        <div>
          <p><strong>Setup:</strong> {joke.setup}</p>
          <p><strong>Punchline:</strong> {joke.punchline}</p>
        </div>
      )}
    </div>
  );
};

export default RandomJoke;
export {};
