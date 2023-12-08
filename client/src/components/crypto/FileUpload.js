import React, { useState } from 'react';
import './FileUploadForm.css'; // Import your CSS file

const FileUploadForm = ({ onFile }) => {
  const [file, setFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileNameParts = selectedFile.name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

      if (fileExtension === 'txt') {
        setFile(selectedFile);
        setError('');
      } else {
        setFile(null);
        setError('Please select a .txt file.');
      }
    } else {
      setFile(null);
      setError('Please select a file.');
    }
  };

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };

  const handleDecrypt = async () => {
    if (file && selectedOption) {
      try {
        const formData = new FormData();
        formData.append('cryptoAlgo', selectedOption);
        formData.append('textFile', file);

        const response = await fetch('http://localhost:8080/api/uploadDecryptFile', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully!');
          alert('File uploaded successfully');
          const responseData1 = await response.json();
          const responseData = responseData1.encrytedData;
          console.log('data', responseData);
          onFile(responseData);
        } else {
          const errorData = await response.json();
          console.error('File upload failed:', errorData.error);
          setError('File upload failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during file upload:', error);
        setError('File upload failed. Please try again.');
      }
    } else {
      setError('Please select a valid file and option.');
    }
  };





  const handleUpload = async () => {
    if (file && selectedOption) {
      try {
        const formData = new FormData();
        formData.append('cryptoAlgo', selectedOption);
        formData.append('textFile', file);

        const response = await fetch('http://localhost:8080/api/uploadFile', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully!');
          alert('File uploaded successfully');
          const responseData1 = await response.json();
          const responseData = responseData1.encrytedData;
          console.log('data', responseData);
          onFile(responseData);
        } else {
          const errorData = await response.json();
          console.error('File upload failed:', errorData.error);
          setError('File upload failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during file upload:', error);
        setError('File upload failed. Please try again.');
      }
    } else {
      setError('Please select a valid file and option.');
    }
  };

  return (
    <div className="file-upload-form">
      <h2>Encrypt/Decrypt File</h2>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      {error && <p className="error-message">{error}</p>}
      <br />
      <select className="crypto-dropdown" onChange={handleOptionChange} value={selectedOption}>
        <option value="">Select an option</option>
        <option value="rc4">RC4</option>
        <option value="simpleSubstitution">Simple Substitution</option>
        <option value="doubleTranposition">Double Transposition</option>
        <option value="des">DES</option>
      </select>
      <br />
      <button className="upload-button" onClick={handleUpload}>
       
        Encrypt
      </button>
      <button className="upload-button" onClick={handleDecrypt}>Decrpyt</button>
    </div>
  );
};

export default FileUploadForm;
