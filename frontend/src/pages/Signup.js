import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [signupinfo, setsignupinfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupinfo = { ...signupinfo };
    copySignupinfo[name] = value;
    setsignupinfo(copySignupinfo);
  };

//   console.log("signupinfo --->", signupinfo);
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupinfo;

    if (!name || !email || !password) {
      
      return handleError('Please fill all the fields');
    }
    
    try {
        const url = "https://pravesh-api.vercel.app/auth/signUp";
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signupinfo),
          });
          
        const data = await response.json();
        console.log("data --->", data);

        const {success, message, error} = data;
        if(success){
            handleSuccess(message);
            setTimeout(() => {
                navigate('/login');
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
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name"
            value={signupinfo.username}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={signupinfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={signupinfo.password}
          />
        </div>
        
        <button>Sign Up</button>
        <span>
          Already have an account?
          <Link to="/login"> Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
