import { IAppointment } from '../../types';

export const AppointmentEmail = (input: IAppointment) => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
          }
          .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            width: 100%;
            background-color: #4CAF50;
            padding: 20px;
            color: white;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
          }
          .email-body {
            padding: 20px;
          }
          .email-row {
            margin-bottom: 15px;
          }
          .email-label {
            font-size: 14px;
            font-weight: bold;
            color: #333333;
          }
          .email-content {
            font-size: 16px;
            color: #555555;
            padding: 8px;
            background-color: #f4f4f4;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            Appointment Details
          </div>
          <div class="email-body">
            <div class="email-row">
              <div class="email-label">Appointment ID:</div>
              <div class="email-content">${input.id}</div>
            </div>
            <div class="email-row">
              <div class="email-label">Title:</div>
              <div class="email-content">${input.title}</div>
            </div>
            <div class="email-row">
              <div class="email-label">Order Date:</div>
              <div class="email-content">${input.orderDate}</div>
            </div>
            <div class="email-row">
              <div class="email-label">Schedule Date:</div>
              <div class="email-content">${input.scheduleDate}</div>
            </div>
            <div class="email-row">
              <div class="email-label">Customer:</div>
              <div class="email-content">${input.customer}</div>
            </div>
            <div class="email-row">
              <div class="email-label">Therapist:</div>
              <div class="email-content">${input.therapist}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};