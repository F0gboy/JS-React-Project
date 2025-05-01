import React, { useState } from 'react';
import axios from 'axios';

function UploadProfilePic({ userId,onUploadSuccess  }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', file);
    formData.append('userId', userId);

    try {
        const response = await axios.post('http://localhost:3001/upload-profile-pic', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        setMessage(response.data.message);
        onUploadSuccess();  // <-- trigger parent refresh
      } catch (error) {
        setMessage('Error uploading file');
      }
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input 
            type="file" 
            onChange={handleFileChange} 
            style={{ padding: '3px', fontSize: '12px' }} // Smaller input
          />
          <button 
            type="submit" 
            style={{ padding: '3px 6px', fontSize: '12px' }} // Smaller button
          >
            Upload Profile Picture
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
}

export default UploadProfilePic;
