import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext(null);

const initialState = {
  workouts: [],
  isLoading: true,
  error: null,
};

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload,
        isLoading: false,
        error: null,
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
        isLoading: false,
        error: null,
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((workout) => workout._id !== action.payload._id),
        isLoading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export function WorkoutsContextProvider({ children }) {
  const [state, dispatch] = useReducer(workoutsReducer, initialState);

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
}
