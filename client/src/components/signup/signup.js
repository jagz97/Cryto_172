import React, { useState } from "react";
import './signup.css';
import Login from "../login/login";

const Signup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); 
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/users/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage('Signup successful!');
        setIsSignupSuccess(true);
        alert('Signup successful!');
        console.log('Signup successful:', responseData);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error); // Set the error message state
        console.error('Signup failed:', errorData.error);
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage(error.message); // Set the error message state
    }finally {
        // Reset the form data after each request
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null);
          }, 5000);
        }
  };

  if (isSignupSuccess) {
    // If signup is successful, render the Login component
    return <Login />;
  }



  return (
    <div className="signup-modal">
      <h2 className="heading">Signup</h2>
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Render your signup form fields similar to the login form */}
        <label className="signup-label">
          Username:
          <input className="signup-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label >
        <br />
        <label  className="signup-label">
          Email:
          <input className="signup-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="signup-label">
          Password:
          <input className="signup-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="signup-button" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
