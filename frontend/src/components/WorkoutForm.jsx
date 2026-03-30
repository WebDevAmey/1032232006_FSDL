import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setEmptyFields([]);

    try {
      const workout = {
        title: title.trim(),
        load: Number(load),
        reps: Number(reps),
      };

      const response = await fetch(`${API_BASE_URL}/api/workouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
      });

      const json = await response.json();

      if (!response.ok) {
        setEmptyFields(json.emptyFields || []);
        dispatch({
          type: 'SET_ERROR',
          payload: json.error || 'Could not create workout',
        });
        return;
      }

      setTitle('');
      setLoad('');
      setReps('');
      setEmptyFields([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message || 'Could not create workout',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="form-card">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">New workout</p>
          <h2>Add a session</h2>
        </div>
      </div>

      <form className="workout-form" onSubmit={handleSubmit}>
        <label className={emptyFields.includes('title') ? 'field invalid' : 'field'}>
          <span>Exercise title</span>
          <input
            type="text"
            value={title}
            placeholder="Push-ups"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <div className="field-row">
          <label className={emptyFields.includes('load') ? 'field invalid' : 'field'}>
            <span>Load</span>
            <input
              type="number"
              min="0"
              value={load}
              placeholder="20"
              onChange={(event) => setLoad(event.target.value)}
            />
          </label>

          <label className={emptyFields.includes('reps') ? 'field invalid' : 'field'}>
            <span>Reps</span>
            <input
              type="number"
              min="1"
              value={reps}
              placeholder="10"
              onChange={(event) => setReps(event.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? 'Saving workout...' : 'Create workout'}
        </button>
      </form>
    </section>
  );
}
