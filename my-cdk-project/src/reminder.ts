
import { SESv2Client, SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-sesv2';
import { EmailWrapper } from "./utils/email-wrapper";
import { AppointmentEmail } from "./utils/appoinment-email";
import { IEmailReminderEvent } from '../types';

let client: SESv2Client;
export const handler = async (event: IEmailReminderEvent) => {
    if (!client) client = new SESv2Client({});

    const input: SendEmailCommandInput = {
    FromEmailAddress: 'agnoteelijah@gmail.com',
    Destination: {ToAddresses: [event.receiver] },
    EmailTags: [{ Name: 'type', Value: 'appointment-confirmation'}],
    ReplyToAddresses: ['agnoteelijah@gmail.com'],
    Content: {
        Simple: {
        Subject: {Data: 'Reminder! You have an appointment in 1 mins' },
        Body: {
            Html: {
                Charset: 'UTF-8',
                Data: EmailWrapper(
                    AppointmentEmail(
                        {
                            id:event.id,
                            title:event.title,
                            orderDate: event.orderDate,
                            scheduleDate: event.scheduleDate,
                            customer: event.customer,
                            therapist: event.therapist,

                    }
                )
            ),
        },
        Text: { Data: 'Test email' },
    },
    },
    },
    };
const command = new SendEmailCommand(input);
await client.send(command);
try {
    await client.send(command);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ message: "Email sent successfully!" }),
    };
} catch (error) {
    console.error("Error sending email:", error);
    return {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ error: "Failed to send email" }),
    };
}
};