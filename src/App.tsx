
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

function App() {
  const [response, setResponse] = useState('');

  const callLambda = async () => {
    const apiUrl = 'https://7ijq9dwucg.execute-api.us-east-1.amazonaws.com/dev/hello';
    const requestBody = {
      key1: 'value1',
      key2: 'value2',
    };

    try {
      // Use Axios to make the POST request
      const res = await axios.get(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Axios automatically parses the JSON response, so no need for res.json()
      console.log('Lambda Response:', res.data);
      
      // Set the response state to display it
      setResponse(JSON.stringify(res.data)); // Convert response to string for display
    } catch (error) {
      console.error('Error calling Lambda:', error);
      // Axios error handling is simple and automatic
      setResponse('Error calling Lambda: ' + error); // Display error message
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Simple Website</h1>
      <button className="btn1" onClick={callLambda}>
        Button 1
      </button>
      <button className="btn2" onClick={() => alert('Button 2 clicked!')}>
        Button 2
      </button>
      <button className="btn3" onClick={() => alert('Button 3 clicked!')}>
        Button 3
      </button>

      <p id="responseMessage">{response}</p>

    </div>
  );
}

export default App;
