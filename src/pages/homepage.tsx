import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const homepage = () => {
    const [response, setResponse] = useState('');
    const navigate = useNavigate(); 
    const callLambda = async () => {
        const apiUrl = 'https://yjfs7k6xp9.execute-api.us-east-1.amazonaws.com/dev/Test';
        try {
            const res = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log('Lambda Response:', data);
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error calling Lambda:', error);
            setResponse('Error calling Lambda: ' + error);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Simple Website</h1>
            <button className="btn1" onClick={callLambda}>
                Call Lambda
            </button>
            <button className="btn2" onClick={() => navigate('/chimedemo')}>
                Go to Chimedemo
            </button>
            <button className="btn3" onClick={() => alert('Button 3 clicked!')}>
                Button 3
            </button>
            <pre id="responseMessage">{response}</pre>
        </div>
    );
};

export default homepage;
