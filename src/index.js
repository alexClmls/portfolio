import React from 'react'
import { createRoot } from 'react-dom/client';
import "./index.css"
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter/appRouter';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
        <AppRouter /> 
    </Router>
  </React.StrictMode>,
)