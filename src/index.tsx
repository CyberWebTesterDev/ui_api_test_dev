import * as React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.Fragment>
    <Router>
      <App />
    </Router>
  </React.Fragment>,
);
