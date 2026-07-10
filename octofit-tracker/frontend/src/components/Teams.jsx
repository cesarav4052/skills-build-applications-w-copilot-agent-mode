import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) throw new Error('Unable to load teams');
        const data = await response.json();
        const teams = Array.isArray(data) ? data : data.items || data.results || [];
        setItems(teams);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((team, index) => (
            <li key={team._id || `${team.name || 'team'}-${index}`} className="list-group-item">
              <strong>{team.name || team}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
