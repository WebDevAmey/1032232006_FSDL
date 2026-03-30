import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import WorkoutDetails from './WorkoutDetails';

export default function WorkoutList() {
  const { workouts, isLoading } = useWorkoutsContext();

  if (isLoading) {
    return (
      <div className="placeholder-panel">
        <div className="skeleton" />
        <div className="skeleton short" />
        <div className="skeleton" />
      </div>
    );
  }

  if (!workouts.length) {
    return (
      <div className="empty-state">
        <p>No workouts yet.</p>
        <span>Add the first session to populate the list.</span>
      </div>
    );
  }

  return (
    <div className="workout-list">
      {workouts.map((workout) => (
        <WorkoutDetails key={workout._id} workout={workout} />
      ))}
    </div>
  );
}
