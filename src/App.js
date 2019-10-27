import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <div className="App-header">   
          <Router />
        </div>  
      </div>
    </ErrorBoundary>
  );
}

export default App;
