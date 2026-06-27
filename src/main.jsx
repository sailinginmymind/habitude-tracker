import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HabitProvider } from './context/HabitContext';
import './index.css';   // <-- import fondamentale

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HabitProvider>
      <App />
    </HabitProvider>
  </React.StrictMode>
);