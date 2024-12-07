import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

const UploadFile = () => {

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Upload Audio & Video Files</h1>

      <FileUploader
        acceptedFileTypes={['audio/*', 'video/*']}  // Accept both audio and video files
        path="uploadfiles/"  // S3 folder path where files are uploaded
        maxFileCount={1}  // Limit to one file
        isResumable={true}  // Allow file upload to resume
      />
    </div>
  );
};

export default UploadFile;
