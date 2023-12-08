import React, { useState } from 'react';
import './TextEntry.css';

const TextBoxForm = () => {
  const [textBoxValue, setTextBoxValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleTextChange = (e) => {
    const value = e.target.value;
    setTextBoxValue(value);
  };

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };

  const handleSubmit = async () => {
    if (textBoxValue && selectedOption) {
      try {
        const data = {
          text: textBoxValue,
          cryptoAlgo: selectedOption,
        };

        const response = await fetch('http://localhost:8080/api/dataEncrypt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert('Data Encrypted successfully');
          const responseData1 = await response.json();
          const responseData = responseData1.encrytedData;
          console.log('data', responseData);
        } else {
          const errorData = await response.json();
          console.error('Data upload failed:', errorData.error);
          alert('Data upload failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during file upload:', error);
        alert('Data upload failed. Please try again.');
      }
    } else {
      alert('Please select a valid option.');
    }
  };

  return (
    <div className='text-entry-form'>
      <h2>Encrypt & Store Data</h2>
      <textarea
        className='text-entry-input'
        value={textBoxValue}
        onChange={handleTextChange}
      />
      <br />
      <select
        className="crypto-dropdown"
        onChange={handleOptionChange}
        value={selectedOption}
      >
        <option value="">Select an option</option>
        <option value="rc4">RC4</option>
        <option value="simpleSubstitution">Simple Substitution</option>
        <option value="doubleTranposition">Double Transposition</option>
        <option value="des">DES</option>
      </select>
      <br />
      <button className='text-entry-button' onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default TextBoxForm;


