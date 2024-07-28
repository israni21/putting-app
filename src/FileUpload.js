// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5000/upload', formData)
      .then(response => {
        console.log('File uploaded and processed:', response.data);
        onUploadSuccess();
        navigate('/select-pickzone');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div className="p-4">
      <input type="file" onChange={onFileChange} />
      <button onClick={onUpload} className="mt-2 p-2 bg-blue-500 text-white rounded">Upload</button>
    </div>
  );
};

export default FileUpload;
