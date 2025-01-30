import React, { useState } from 'react';

const EmailForm = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // To hold success or error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!name || !email || !message) {
      setStatus('All fields are required.');
      return;
    }

    const formData = { subject:name, to:email, message:message };

    try {
      // Send the form data to Azure Function API
      const response = await fetch('https://email-form-app.azurewebsites.net/api/email-sender', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the email was sent successfully
      if (response.ok) {
        setStatus('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else if (response.status === 429) {
        setStatus("The contact form submission limit for this month has been reached. Please try again next month.");
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Contact Yourself</h1>
      <p>Sends an email to the provided address with the message</p>
      {status && <p>{status}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>

        <div>
          <label htmlFor="email">Target Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required
          ></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default EmailForm;