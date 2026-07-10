import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) throw new Error('Unable to load workouts');
        const data = await response.json();
        const workouts = Array.isArray(data) ? data : data.items || data.results || [];
        setItems(workouts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((workout, index) => (
            <li key={workout._id || `${workout.name || 'workout'}-${index}`} className="list-group-item">
              <strong>{workout.name || workout}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
