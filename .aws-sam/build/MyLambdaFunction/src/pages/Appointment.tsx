import axios from 'axios';
import { useState } from 'react';

const Appointment = () => {
  const apiUrl2 = 'https://ngkn80fdo9.execute-api.us-east-1.amazonaws.com/prod/ses-sender-function';
  const [loading, setLoading] = useState(false);

  //send email with sample
  const sendEmail = async () => {
  
    const payload = {
      id: "test1",
      title: "appointment",
      scheduleDate: "2024-12-07T09:35:37",
      customer: "john",
      therapist: "ben",
      receiver: "whoisyoutueber@gmail.com",
    };
  
    setLoading(true);  // Start loading
  
    try {
      const response = await fetch(apiUrl2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error: Failed to send email.');
    } finally {
      setLoading(false);  // Stop loading
    }
  };


  //send scheduler reminder
  const [email, setEmail] = useState("");
  const [scheduleTime, setScheduleTime] = useState(""); // Format: "YYYY-MM-DDTHH:MM:SSZ"

  const handleClick = async () => {
    try {
      const payload = {
        email,
        scheduleTime,
      };

      // Send request to the API Gateway that triggers the Lambda
      await axios.post("https://your-api-gateway-endpoint.amazonaws.com", payload);

      alert("Schedule Created!");
    } catch (error) {
      console.error("Error creating schedule:", error);
      alert("Failed to create schedule.");
    }
  };

 



  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Simple Website</h1>

      <button onClick={sendEmail} disabled={loading}>
      {loading ? 'Sending...' : 'Send Appointment Email'}
      </button>

      <div> 
      <input
        type="email"
        placeholder="Enter receiver's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="datetime-local"
        value={scheduleTime}
        onChange={(e) => setScheduleTime(e.target.value)}
      />
      <button onClick={handleClick}>Schedule Event</button>
    </div>
    </div>
  );
}


export default Appointment;
