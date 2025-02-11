import React from 'react';
import './App.css';
import EmailForm from './Comp/EmailForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Test Site For Azure Webservices</h1>
        <p className="App-subtitle">Send an email using our simple contact form</p>
      </header>
      
      <div className="App-content">
        <EmailForm />
      </div>
    </div>
  );
}

export default App;