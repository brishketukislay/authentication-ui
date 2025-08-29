import React, { useState } from 'react';
import axios from 'axios';
import http from '../interceptor/axios.interceptor';
import strings from '../constants/strings.json';
import { useNavigate } from 'react-router-dom';

const RandomJoke: React.FC = () => {
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const logout = async () => {
    try {
      console.log("Logging out...");
      await http.post('/users/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      document.cookie = 'access_token=; Max-Age=0; path=/;';
      document.cookie = 'refresh_token=; Max-Age=0; path=/;';
      navigate('/login');
    }
  };

  return (
    <div>
      <button onClick={fetchJoke} disabled={loading}>
        {loading ? 'Loading...' : 'Get Random Joke'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {joke && (
        <div>
          <p><strong>{strings.joke.setup}</strong> {joke.setup}</p>
          <p><strong>{strings.joke.punchline}</strong> {joke.punchline}</p>
        </div>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default RandomJoke;
export { };
