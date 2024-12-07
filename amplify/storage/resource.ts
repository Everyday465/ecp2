import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'transcribeupload', // Name of your S3 bucket
  access: (allow) => ({
    'uploadfiles/*': [  // Define the folder path within the S3 bucket
      allow.authenticated.to(['read', 'write']) , // Permissions for authenticated users
      allow.guest.to(['read','write']) // Permissions for unauthenticated users
    ],
  }),
});
