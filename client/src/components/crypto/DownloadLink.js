import React from 'react';
import './downloadlink.css'

const DownloadLink = ({ fileData }) => {
  const handleDownload = () => {
    if (fileData) {

        console.log("data",fileData);
      const blob = new Blob([fileData], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'encrypted_data.txt'; 
      link.click();
    }
  };

  
        
       
     
  return (
    <div className="centered-link">
    
      {fileData && (
        <div className="link-box">
    
        <span className="link-icon">📥</span>
        <a class="link" href={`data:application/octet-stream;base64,${btoa(fileData)}`} download="downloaded_data.txt" onClick={handleDownload}>
          Download File
        </a>
        </div>
      )}
    
    </div>

  );
};

export default DownloadLink;

