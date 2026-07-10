import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) throw new Error('Unable to load leaderboard');
        const data = await response.json();
        const leaderboard = Array.isArray(data) ? data : data.items || data.results || [];
        setItems(leaderboard);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((entry, index) => (
            <li key={entry._id || `${entry.userEmail || 'entry'}-${index}`} className="list-group-item">
              <strong>{entry.userEmail || entry.name || entry}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
