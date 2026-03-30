import { useEffect } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function HomePage() {
  const { dispatch, error, isLoading } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      dispatch({ type: 'SET_LOADING' });

      try {
        const response = await fetch(`${API_BASE_URL}/api/workouts`);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || 'Failed to fetch workouts');
        }

        dispatch({ type: 'SET_WORKOUTS', payload: json });
      } catch (fetchError) {
        dispatch({
          type: 'SET_ERROR',
          payload: fetchError.message || 'Failed to fetch workouts',
        });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Net Ninja MERN Stack Tutorial</p>
          <h1>Workout tracker, built the full-stack way.</h1>
          <p className="hero-text">
            Create workouts, fetch them from MongoDB, delete entries, and handle API errors
            cleanly. This is the stretch of the tutorial that turns the backend into a usable app.
          </p>
          <div className="hero-metrics">
            <div>
              <strong>4</strong>
              <span>REST operations</span>
            </div>
            <div>
              <strong>1</strong>
              <span>React context</span>
            </div>
            <div>
              <strong>1</strong>
              <span>MongoDB collection</span>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <span className="panel-label">API endpoint</span>
          <code>GET /api/workouts</code>
          <code>POST /api/workouts</code>
          <code>DELETE /api/workouts/:id</code>
          <p className="panel-note">
            The frontend talks to the Express server on port 4000, so browser requests stay in sync
            with the tutorial backend.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <WorkoutForm />
        <section className="workout-feed">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Workout log</p>
              <h2>Saved sessions</h2>
            </div>
            <span className={`status-pill ${isLoading ? 'is-loading' : ''}`}>
              {isLoading ? 'Loading workouts' : 'Ready'}
            </span>
          </div>

          {error ? (
            <div className="error-banner" role="alert">
              {error}
            </div>
          ) : null}

          <WorkoutList />
        </section>
      </section>
    </main>
  );
}
