import { useEffect, useState } from "react";
function App() {

  //   client.models.Todo.observeQuery().subscribe({
//lamba funtion async
  const callLambda = async () => {
    //enter api url here
    const apiUrl = 'https://7ijq9dwucg.execute-api.us-east-1.amazonaws.com/dev/hello';
  
    //enter json request body if need
    const requestBody = JSON.stringify({
      key1: 'value1',
      key2: 'value2',
    });
  
    try {
      const response = await fetch(apiUrl, {
        //GET/POST/PUT/DEL
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //maybe need auth header
          // Add authorization headers if necessary
        },
      });
  
      const data = await response.json();
      // Assuming the Lambda response is a simple JSON string
      setResponseMessage(data); // Update the state with the response message
      console.log('Lambda Response:', data);
    } catch (error) {
      console.error('Error calling Lambda:', error);
    }
  };

  const [responseMessage, setResponseMessage] = useState<string>('');


  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Simple Website</h1>
      <button
        className="btn1"
        onClick={callLambda}
      >
        Button 1
      </button>
      <button
        className="btn2"
        onClick={() => alert('Button 2 clicked!')}
      >
        Button 2
      </button>
      <button
        className="btn3"
        onClick={() => alert('Button 3 clicked!')}
      >
        Button 3
      </button>
      <p id="responseMessage">{responseMessage}</p>
    </div>
  ); 
}

export default App;
