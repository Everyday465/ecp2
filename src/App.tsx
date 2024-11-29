import { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');

  // Lambda function async
  const callLambda = async () => {
    // Enter API URL here
    const apiUrl = 'https://7ijq9dwucg.execute-api.us-east-1.amazonaws.com/dev';

    // Enter JSON request body if needed
    const requestBody = JSON.stringify({
      key1: 'value1',
      key2: 'value2',
    });

    try {
      const res = await fetch(apiUrl, {
        // Use POST method to send the request body
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      const data = await res.json();
      console.log('Lambda Response:', data);
      
      // Set the response state to display it
      setResponse(JSON.stringify(data)); // Convert response to string for display
    } catch (error) {
      console.error('Error calling Lambda:', error);
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