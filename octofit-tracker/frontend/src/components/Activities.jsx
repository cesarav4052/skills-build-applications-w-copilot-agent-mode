import { useEffect, useState } from 'react';

const activitiesUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(activitiesUrl);
        if (!response.ok) throw new Error('Unable to load activities');
        const data = await response.json();
        const activities = Array.isArray(data) ? data : data.items || data.results || [];
        setItems(activities);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((activity, index) => (
            <li key={activity._id || `${activity.type || 'activity'}-${index}`} className="list-group-item">
              <strong>{activity.type || activity.name || activity}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
