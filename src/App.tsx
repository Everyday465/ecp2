import { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');

  // Lambda function async
  const callLambda = async () => {
    const apiUrl = 'https://yjfs7k6xp9.execute-api.us-east-1.amazonaws.com/dev/'; // Updated API URL

    try {
      const res = await fetch(apiUrl, {
        method: 'GET', // GET request
        headers: {
          'Content-Type': 'application/json', // Optional for GET
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json(); // Assuming the response is JSON
      console.log('Lambda Response:', data);

      // Set the response state to display it
      setResponse(JSON.stringify(data, null, 2)); // Format JSON for readability
    } catch (error) {
      console.error('Error calling Lambda:', error);
      setResponse('Error calling Lambda: ' + error); // Display error message
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Simple Website</h1>
      <button className="btn1" onClick={callLambda}>
        Call Lambda
      </button>
      <button className="btn2" onClick={() => alert('Button 2 clicked!')}>
        Button 2
      </button>
      <button className="btn3" onClick={() => alert('Button 3 clicked!')}>
        Button 3
      </button>

      <pre id="responseMessage">{response}</pre>
    </div>
  );
}

export default App;
