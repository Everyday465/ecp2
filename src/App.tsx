import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {

  //template start
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  //template end

  const [responseMessage, setResponseMessage] = useState<string>('');

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
        body: requestBody
      });
  
      const data = await response.json();
      console.log('Lambda Response:', data);
    } catch (error) {
      console.error('Error calling Lambda:', error);
    }
  };


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
    // <main>
    //   <h1>My todos</h1>
    //   <button onClick={createTodo}>+ new</button>
    //   <ul>
    //     {todos.map((todo) => (
    //       <li key={todo.id}>{todo.content}</li>
    //     ))}
    //   </ul>
    //   <div>
    //     🥳 App successfully hosted. Try creating a new todo.
    //     <br />
    //     <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
    //       Review next step of this tutorial.
    //     </a>
    //   </div>
    // </main>
  ); 
}

export default App;
