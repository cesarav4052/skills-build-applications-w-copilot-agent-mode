import { useEffect, useState } from 'react';

const usersUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(usersUrl);
        if (!response.ok) throw new Error('Unable to load users');
        const data = await response.json();
        const users = Array.isArray(data) ? data : data.items || data.results || [];
        setItems(users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((user, index) => (
            <li key={user._id || `${user.email || 'user'}-${index}`} className="list-group-item">
              <strong>{user.name || user.email || user}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
