import React from 'react';
import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';


const UploadPage = () => {
  return (
    <div>
      <h1>Upload Page</h1>
      <FileUploader
        acceptedFileTypes={['audio/*', 'video/*']}  // Update accepted types as needed
        path="public/"  // The path where files will be uploaded
        maxFileCount={1}  // Limit to one file at a time
        isResumable  // Enable resumable uploads for large files
      />
    </div>
  );
};

export default UploadPage;
