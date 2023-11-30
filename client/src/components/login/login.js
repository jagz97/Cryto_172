import React, { useState } from "react";
import './login.css';
import Cookies from 'js-cookie';
import { useAuth } from "../../AuthContext";


const Login = ({ onLogin }) => {


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);


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
      const response = await fetch('http://localhost:8080/api/users/auth/signin', {
        credentials: "include",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login successful:', responseData);
        Cookies.set('auth_token', 'value')
        await login();

        
        alert('Login successful');

        // Call the onLogin callback passed as a prop
        if (onLogin) {
            onLogin(responseData);
          }

        
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        alert(errorData.message);
        console.error('Login failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage(error.message);
    }
  };
  

  return (
    <div className="login-container">
      <h2 className="login-modal">Login</h2>
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button className="LoginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
