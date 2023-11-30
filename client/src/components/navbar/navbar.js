import React from "react"
import { useState } from "react";
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/NavBar"
import Container from "react-bootstrap/Container"
import Login from "../login/login"; 
import Signup from "../signup/signup";
import { useAuth } from '../../AuthContext';
import "./navbar.css"
import FileUploadForm from "../crypto/FileUpload";
import TextBoxForm from "../crypto/TextEntryForm";
import DownloadLink from "../crypto/DownloadLink";
import Tables from "../table/Table";



const MyNavbar = () => {

  
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const [fileData, setFileData] = useState(null);


  const handleOnFile = (responseData) => {
    setFileData(responseData);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
    
  };

  const handleSignupClick = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleLogoutClick = async () => {
    logout();


    try {
      await fetch('http://localhost:8080/api/users/auth/logout', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        }, 
      });
      
    } catch (error) {
      console.error('Error during signup:', error);
    }
    
  };


    return (
      <><div>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                src="logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo" />
            </Navbar.Brand>
            <Navbar.Brand href="#home">Cryptoid</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                
              </Nav>
              <Nav>
          {!isLoggedIn && (
            <>
              <Nav.Link className="link-login" onClick={handleLoginClick}>
                Login
              </Nav.Link>
              <Nav.Link className="link-login" onClick={handleSignupClick}>
                Signup
              </Nav.Link>
            </>
          )}
          {isLoggedIn && (
            <Nav.Link className="link-login" onClick={handleLogoutClick}>
              Logout
            </Nav.Link>
          )}
        </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


      </div>
      
      <div className="bg">
      {!isLoggedIn && (
         <>
          {showLogin && <Login/> }
          {showSignup && <Signup />}
          </>
          )}
          {isLoggedIn && (
         <>
            <FileUploadForm onFile={handleOnFile} />
            <DownloadLink fileData={fileData} />
            <TextBoxForm/>
           
           <Tables/>
          </>
          )}
        </div></>
    
    )


}
export default MyNavbar
