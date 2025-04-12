import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

function Login() {
  const [logininfo, setlogininfo] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copylogininfo = { ...logininfo };
    copylogininfo[name] = value;
    setlogininfo(copylogininfo);
  };

//   console.log("logininfo --->", logininfo);
  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;

    if ( !email || !password) {
      
      return handleError('Please fill all the fields');
    }
    
    try {
        const url = "http://localhost:8080/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(logininfo),
          });
          
        const data = await response.json();
        console.log("data --->", data);

        const {success, message,token, name, error} = data;
        if(success){
            handleSuccess(message);
            localStorage.setItem("token", token);
            localStorage.setItem("LoggedInUser", name);
            setTimeout(() => {
                navigate('/home');
            },1000)
        }else if(error){
            const detail = error?.details[0].message;
            handleError(detail);
        }else if(!success)
        {
            handleError(message);
        }


    } catch (error) {
        console.error("Error during signup:", error);
        handleError("Signup failed. Please try again later.", error);
    }


  }
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handlelogin}>
      
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={logininfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={logininfo.password}
          />
        </div>
        
        <button>Login</button>
        <span>
          Do not have a Account? 
          <Link to="/Signup"> Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
