import axios from 'axios';
import { useState } from 'react';

const Appointment = () => {
  const apiUrl2 = 'https://ngkn80fdo9.execute-api.us-east-1.amazonaws.com/prod/ses-sender-function';
  // const apiUrl3 = 'https://ngkn80fdo9.execute-api.us-east-1.amazonaws.com/prod/ses-sender-reminder-function';
  // const apiUrl4 = 'https://ngkn80fdo9.execute-api.us-east-1.amazonaws.com/prod/create_notification_scheduler';
  const apiUrl5 = 'https://ngkn80fdo9.execute-api.us-east-1.amazonaws.com/prod/lambdaA';

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

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

  // const sendReminderEmail = async () => {
  
  //   const payload = {
  //     id: "test1",
  //     title: "appointment",
  //     scheduleDate: "2024-12-07T09:35:37",
  //     customer: "john",
  //     therapist: "ben",
  //     receiver: "whoisyoutueber@gmail.com",
  //   };
  
  //   setLoading2(true);  // Start loading
  
  //   try {
  //     const response = await fetch(apiUrl4, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });
  
  //     const data = await response.json();
  //     if (response.ok) {
  //       alert('Reminder Email will be sent soon!');
  //     } else {
  //       alert('Failed to send email: ' + data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     alert('Error: Failed to send email.');
  //   } finally {
  //     setLoading2(false);  // Stop loading
  //   }
  // };

  const sendReminderEmail2 = async () => {
  
    const payload = {
      id: "test1",
      title: "appointment",
      scheduleDate: "2024-12-07T09:35:37",
      customer: "john",
      therapist: "ben",
      receiver: "whoisyoutueber@gmail.com",
    };
  
    setLoading3(true);  // Start loading
  
    try {
      const response = await fetch(apiUrl5, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Reminder Email will be sent 1min from now!');
      } else {
        alert('Failed to send email: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error: Failed to send email.');
    } finally {
      setLoading3(false);  // Stop loading
    }
  };


  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Simple Website</h1>

      <button onClick={sendEmail} disabled={loading}>
      {loading ? 'Sending...' : 'Send Appointment Email'}
      </button>

      {/* <button onClick={sendReminderEmail} disabled={loading2}>
      {loading2 ? 'Sending...' : 'Send Reminder Appointment Email'}
      </button> */}

      <button onClick={sendReminderEmail2} disabled={loading3}>
      {loading3 ? 'Sending...' : 'Send Reminder Appointment Email(lambdaA)'}
      </button>
    </div>
  );
}


export default Appointment;
