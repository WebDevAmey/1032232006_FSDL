import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { WorkoutsContextProvider } from './context/WorkoutsContext';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <WorkoutsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </WorkoutsContextProvider>
  );
}
