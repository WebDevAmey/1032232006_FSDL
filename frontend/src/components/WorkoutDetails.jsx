import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/workouts/${workout._id}`, {
        method: 'DELETE',
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Could not delete workout');
      }

      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message || 'Could not delete workout',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="workout-card">
      <div className="workout-card__top">
        <div>
          <p className="workout-title">{workout.title}</p>
          <p className="workout-meta">
            Added {new Date(workout.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label={`Delete workout ${workout.title}`}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      <dl className="workout-stats">
        <div>
          <dt>Load</dt>
          <dd>{workout.load} kg</dd>
        </div>
        <div>
          <dt>Reps</dt>
          <dd>{workout.reps}</dd>
        </div>
      </dl>
    </article>
  );
}
