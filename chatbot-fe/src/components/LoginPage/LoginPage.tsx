import React, { useState } from 'react';
import httpClient from '../../httpClient';
import "./LoginPage.css";
import Card from "../Card/Card";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("Initial");

  const handleLogin = async (event: any) => {
    event.preventDefault();
    console.log(username, password);
    const baseUrl = `https://roklive-chatbot-backend.azurewebsites.net`;
    try {
      const resp = await axios.post("https://roklive-chatbot-backend.azurewebsites.net/login", {
        username,
        password,
      });
      const now = new Date();
      // Format datetime to "YYYYMMDDTHHmmsssssZ"
      const formattedDatetime = now.getUTCFullYear().toString() +
      String(now.getUTCMonth() + 1).padStart(2, '0') + // Months are 0-indexed, so add 1
      String(now.getUTCDate()).padStart(2, '0') + 'T' +
      String(now.getUTCHours()).padStart(2, '0') +
      String(now.getUTCMinutes()).padStart(2, '0') +
      String(now.getUTCSeconds()).padStart(2, '0') +
      String(now.getUTCMilliseconds()).padStart(3, '0') + 'Z';

      localStorage.setItem('isLoggedIn', "true")
      localStorage.setItem('userSession', formattedDatetime);

      navigate("/homeContent");
      // window.location.href = "/home";
    } catch (error: any) {
      if (error.response.status === 401) {
        setErrorMessages("noUsername")
      }
      else if (error.response.status === 402) {
        setErrorMessages("username")
      }
      else if (error.response.status === 403) {
        setErrorMessages("noPassword")
      }
      else if (error.response.status === 404) {
        setErrorMessages("password")
      }
      console.log(errorMessages);
    }
  };

  // Render error messages for Username
  const renderErrorMsgUserName = (error: string): JSX.Element | null => {
    if (error === "noUsername") {
      return <p className="error_msg">Please enter your username</p>;
    } else if (error === "username") {
      return <p className="error_msg">Invalid username</p>;
    } else {
      return null;
    }
  };

  // Render error messages for Password
  const renderErrorMsgPassword = (error: string): JSX.Element | null => {
    if (error === "noPassword") {
      return <p className="error_msg">Please enter your password</p>;
    } else if (error === "password") {
      return <p className="error_msg">Invalid password</p>;
    } else {
      return null;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  };

  return (
  <div className='main_login'>
    <Card>
      <h1 className="title_login">Sign In</h1>
      <p className="subtitle_login">
        Please log in using your username and password!
      </p>
      <form onSubmit={LoginPage}>
        <div className="inputs_container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {renderErrorMsgUserName(errorMessages)}
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {renderErrorMsgPassword(errorMessages)}

        </div>
        <button type="button" className="login_button" onClick={(event) => handleLogin(event)}>
            Log in
        </button>
        
      </form>
      <div className="link_container_login">
        <a href="" className="small_login">
          Forgot Password?
        </a>
      </div>
      <div className="icons_login">
        <GoogleIcon className="icons_login" />
        <FacebookIcon className="icons_login" />
        <TwitterIcon className="icons_login" />
      </div>
    </Card>
  </div>
  
  );
  };

  export default LoginPage;
