import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';


const UploadFile = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<File>>(new Set()); // Track selected files
  const [messages, setMessages] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Function to verify if the file is a valid audio file
  const verifyAudioContent = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const audio = new Audio();
      const objectUrl = URL.createObjectURL(file);
      audio.src = objectUrl;

      audio.oncanplay = () => {
        resolve(`✅ "${file.name}" contains valid audio content.`);
        URL.revokeObjectURL(objectUrl); // Clean up the object URL
      };

      audio.onerror = () => {
        reject(`❌ "${file.name}" does not contain valid audio content.`);
        URL.revokeObjectURL(objectUrl); // Clean up the object URL
      };
    });
  };

  // Function to handle the file drop
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const audioFiles = acceptedFiles.filter((file) => file.type.startsWith('audio/'));
    if (audioFiles.length === 0) {
      setMessages((prev) => [...prev, '❌ Please upload only audio files.']);
      return;
    }

    const validationResults: string[] = [];
    for (const file of audioFiles) {
      try {
        const result = await verifyAudioContent(file);
        validationResults.push(result);
        setFiles((prev) => [...prev, file]);
      } catch (error) {
        validationResults.push(error as string);
      }
    }

    setMessages((prev) => [...prev, ...validationResults]);
  }, []);

  // Function to convert file to Base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          resolve((reader.result as string).split(',')[1]); // Remove data URL prefix
        } else {
          reject('Failed to read file.');
        }
      };
      reader.onerror = reject;
    });
  };

  // Function to handle file upload to the API
  const handleUpload = async () => {
    const filesToUpload = Array.from(selectedFiles); // Convert selected files set to array

    if (filesToUpload.length === 0) {
      setUploadStatus('❌ No files selected to upload!');
      return;
    }

    try {
      setUploadStatus('⏳ Uploading files...');

      // Loop through each selected file and send individual API requests
      for (const file of filesToUpload) {
        const base64Data = await convertFileToBase64(file);

        // Log the Base64 encoded data before sending
      console.log(`Base64 Data for ${file.name}:`, base64Data); // Check Base64 content here

        // Prepare the data for the current file
        const fileData = {
          body: base64Data,
          isBase64Encoded: true,
        };

        // Send the request to the API for the current file
        const response = await fetch('https://ajcdmtx752.execute-api.us-east-1.amazonaws.com/dev/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'file-name': file.name, // Send file name as a header
            'file-type': file.type, // Send file type as a header
          },
          body: JSON.stringify(fileData),
        });

        // Handle the response for each file
        if (response.ok) {
          setUploadStatus('✅ Files uploaded successfully!');
        } else {
          const errorData = await response.json();
          setUploadStatus(`❌ Failed to upload file: ${errorData.message}`);
        }
      }

      // Clear files after successful upload
      setFiles([]);
      setSelectedFiles(new Set());
    } catch (error) {
      setUploadStatus('❌ Failed to upload files.');
    }
  };

  // Handle file selection or deselection
  const toggleFileSelection = (file: File) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedSelectedFiles = new Set(prevSelectedFiles);
      if (updatedSelectedFiles.has(file)) {
        updatedSelectedFiles.delete(file); // Deselect file if it's already selected
      } else {
        updatedSelectedFiles.add(file); // Select the file if it's not selected
      }
      return updatedSelectedFiles;
    });
  };

  // Configure the dropzone for file uploads
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.ogg'],
    },
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Upload Audio Files</h1>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #cccccc',
          borderRadius: '10px',
          padding: '20px',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f0f8ff' : '#ffffff',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the audio files here...</p>
        ) : (
          <p>Drag and drop audio files here, or click to select files.</p>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Selected Files</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={selectedFiles.has(file)}
                onChange={() => toggleFileSelection(file)}
              />
              {file.name}
              <button
                onClick={() => setFiles((prev) => prev.filter((f) => f !== file))}
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleUpload}
      >
        Upload Files
      </button>
      {uploadStatus && (
        <p style={{ marginTop: '20px', color: uploadStatus.startsWith('✅') ? 'green' : 'red' }}>
          {uploadStatus}
        </p>
      )}
      <div style={{ marginTop: '20px', textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}>
        <h3>Messages</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index} style={{ color: message.startsWith('✅') ? 'green' : 'red' }}>
              {message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadFile;
