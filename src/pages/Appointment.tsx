import { useState } from 'react';

const Appointment = () => {
  const apiUrl2 = 'https://ngkn80fdo9.execute-api.us-east-1.amazonaws.com/prod/ses-sender-function';
  const apiUrl5 = 'https://ngkn80fdo9.execute-api.us-east-1.amazonaws.com/prod/lambdaA';
  const apiUrl6 = 'https://ngkn80fdo9.execute-api.us-east-1.amazonaws.com/prod/posts';

  // const [loading, setLoading] = useState(false);
  // const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  // State to capture user input for appointment details
  const [formData, setFormData] = useState({
    id: 'test',
    title: '',
    orderDate: Date.now(),
    scheduleDate: '',
    customer: '',
    therapist: '',
    receiver: '',
  });

  // State to store saved information
  const [savedData, setSavedData] = useState('');

  // Handle input changes
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Save input data
  const saveInputData = () => {
    setSavedData(JSON.stringify(formData, null, 2)); // Save the data in a formatted JSON string
  };

  const sendPost = async () => {
    const payload = { ...formData }; // Build payload from form data

    setLoading4(true);  // Start loading
    
    try {
      const response = await fetch(apiUrl6, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '1I7GuREY7C1ZYn6yYzf3G3OHAjFntYAS9bSUgc9Q',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Appointment scheduled successfully!');
      } else {
        alert('Failed to schedule appointment: ' + data.error);
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('Error: Failed to schedule appointment.');
    } finally {
      setLoading4(false);  // Stop loading
    }

    //send email notification
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
        //alert('Email sent successfully!');
      } else {
        alert('Failed to send email: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error: Failed to send email.');
    }

    //schedule reminder
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
        //alert('Reminder Email will be sent 5mins before schedule from now!');
      } else {
        alert('Failed to send email: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error: Failed to send email.');
    }
  };

  // const sendEmail = async () => {
  //   const payload = { ...formData }; // Build payload from form data

  //   setLoading(true);  // Start loading

  //   try {
  //     const response = await fetch(apiUrl2, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       alert('Email sent successfully!');
  //     } else {
  //       alert('Failed to send email: ' + data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     alert('Error: Failed to send email.');
  //   } finally {
  //     setLoading(false);  // Stop loading
  //   }
  // };

  // const sendReminderEmail2 = async () => {
  //   const payload = { ...formData }; // Build payload from form data

  //   setLoading3(true);  // Start loading

  //   try {
  //     const response = await fetch(apiUrl5, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       alert('Reminder Email will be sent 5mins before schedule from now!');
  //     } else {
  //       alert('Failed to send email: ' + data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     alert('Error: Failed to send email.');
  //   } finally {
  //     setLoading3(false);  // Stop loading
  //   }
  // };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Simple Website</h1>

      <div>
      <div
  style={{
    display: 'flex',
    flexDirection: 'column',  // Stack elements vertically
    alignItems: 'center',     // Center the div horizontally
    justifyContent: 'center', // Center content vertically
    fontFamily: 'monospace',
    marginTop: '20px',
  }}
>
  {/* Form for user input */}
  <label style={{ alignSelf: 'flex-end', fontSize: '14px', marginBottom: '8px' }}>
    Title:
    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleInputChange}
      style={{ width: '300px', marginLeft: '10px' }} // Adjust width to match
    />
  </label>
  <br />
  <label style={{ alignSelf: 'flex-end', fontSize: '14px', marginBottom: '8px' }}>
    Schedule Date:
    <input
      type="datetime-local"
      name="scheduleDate"
      value={formData.scheduleDate}
      onChange={handleInputChange}
      style={{ width: '300px', marginLeft: '10px' }} // Adjust width to match
    />
  </label>
  <br />
  <label style={{ alignSelf: 'flex-end', fontSize: '14px', marginBottom: '8px' }}>
    Customer:
    <input
      type="text"
      name="customer"
      value={formData.customer}
      onChange={handleInputChange}
      style={{ width: '300px', marginLeft: '10px' }} // Adjust width to match
    />
  </label>
  <br />
  <label style={{ alignSelf: 'flex-end', fontSize: '14px', marginBottom: '8px' }}>
    Therapist:
    <input
      type="text"
      name="therapist"
      value={formData.therapist}
      onChange={handleInputChange}
      style={{ width: '300px', marginLeft: '10px' }} // Adjust width to match
    />
  </label>
  <br />
  <label style={{ alignSelf: 'flex-end', fontSize: '14px', marginBottom: '8px' }}>
    Receiver Email:
    <input
      type="email"
      name="receiver"
      value={formData.receiver}
      onChange={handleInputChange}
      style={{ width: '300px', marginLeft: '10px' }} // Adjust width to match
    />
  </label>
  <br />
</div>


        

        {/* Button to Save Input */}
        <button onClick={saveInputData}>Save Information</button>
        <br />
        
        {/* Display saved information */}
        <textarea
          value={savedData}
          rows={6}
          cols={50}
          readOnly
          style={{ marginTop: '20px', fontFamily: 'monospace' }}
        />
        <br />

        {/* Button to Schedule Appointment */}
        <button onClick={sendPost} disabled={loading4}>
          {loading4 ? 'Sending...' : 'Schedule Appointment'}
        </button>

        {/* <button onClick={sendEmail} disabled={loading}>
          {loading ? 'Sending...' : 'Send Appointment Email'}
        </button>

        <button onClick={sendReminderEmail2} disabled={loading3}>
          {loading3 ? 'Sending...' : 'Send Reminder Appointment Email(lambdaA)'}
        </button> */}
      </div>
    </div>
  );
};

export default Appointment;
