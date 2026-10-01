import { useEffect, useMemo, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [mode, setMode] = useState('login');
  const [authForm, setAuthForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [todoForm, setTodoForm] = useState({ title: '', description: '' });
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const filteredTodos = useMemo(() => {
    if (!search.trim()) return todos;
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(search.toLowerCase()))
    );
  }, [todos, search]);

  const isLoggedIn = Boolean(token);

  const request = async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  };

  const fetchTodos = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const data = await request('/api/todos/alltodos?sort=desc');
      setTodos(data.data || []);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  const handleAuthChange = (field, value) => {
    setAuthForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      if (mode === 'register') {
        await request('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            username: authForm.username,
            email: authForm.email,
            password: authForm.password,
          }),
        });

        setMode('login');
        setAuthForm({ username: '', email: authForm.email, password: '' });
        setError('');
      } else {
        const data = await request('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: authForm.email,
            password: authForm.password,
          }),
        });

        localStorage.setItem('token', data.token);
        setToken(data.token);
        setAuthForm({ username: '', email: '', password: '' });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!todoForm.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setLoading(true);
      await request('/api/todos/create', {
        method: 'POST',
        body: JSON.stringify({
          title: todoForm.title,
          description: todoForm.description,
        }),
      });

      setTodoForm({ title: '', description: '' });
      await fetchTodos();
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      await request(`/api/todos/${id}/toggle`, { method: 'PATCH' });
      await fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await request(`/api/todos/${id}`, { method: 'DELETE' });
      await fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setTodos([]);
    setSearch('');
    setError('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-900/20 backdrop-blur">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-2xl font-bold text-cyan-300">
              T
            </div>
            <h1 className="text-3xl font-bold">TodoFlow</h1>
            <p className="mt-2 text-sm text-slate-400">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="mb-1 block text-sm text-slate-300">Username</label>
                <input
                  type="text"
                  value={authForm.username}
                  onChange={(e) => handleAuthChange('username', e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-0 transition focus:border-cyan-400"
                  placeholder="Enter username"
                  required
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm text-slate-300">Email</label>
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => handleAuthChange('email', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-300">Password</label>
              <input
                type="password"
                value={authForm.password}
                onChange={(e) => handleAuthChange('password', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            {mode === 'login' ? 'Need an account?' : 'Already have an account?'}{' '}
            <button
              type="button"
              className="font-semibold text-cyan-300"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError('');
              }}
            >
              {mode === 'login' ? 'Sign up' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/40 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold">My Todo App</h1>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            Logout
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1.9fr]">
          <aside className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/30">
            <h2 className="mb-4 text-xl font-semibold">Add New Todo</h2>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateTodo} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-300">Title</label>
                <input
                  type="text"
                  value={todoForm.title}
                  onChange={(e) => setTodoForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
                  placeholder="e.g. Finish project"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Description</label>
                <textarea
                  rows="4"
                  value={todoForm.description}
                  onChange={(e) => setTodoForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
                  placeholder="Optional description"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Saving...' : 'Create Todo'}
              </button>
            </form>
          </aside>

          <main className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/30">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold">Todo List</h2>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search todos..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400 sm:max-w-xs"
              />
            </div>

            {loading && !todos.length ? (
              <div className="py-8 text-center text-slate-400">Loading todos...</div>
            ) : filteredTodos.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/30 p-8 text-center text-slate-400">
                No todos found
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTodos.map((todo) => (
                  <div
                    key={todo._id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={Boolean(todo.isCompleted)}
                        onChange={() => handleToggleTodo(todo._id)}
                        className="mt-1 h-5 w-5 accent-cyan-500"
                      />
                      <div>
                        <p className={`text-lg font-medium ${todo.isCompleted ? 'text-slate-400 line-through' : 'text-white'}`}>
                          {todo.title}
                        </p>
                        {todo.description && (
                          <p className="mt-1 text-sm text-slate-400">{todo.description}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
