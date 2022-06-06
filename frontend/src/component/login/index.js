import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { login } from "../../redux/reducers/auth";


export const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  // ===================================



  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  //===================================

  const loginn = () => {
    axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((result) => {
        if (result.data.success) {
          setMessage("login succefull");
          dispatch(login(result.data.token));
          navigate("/");
        }
      })

      .catch((err) => {
        setMessage("Error happened while Login, please try again");
      });
  };

  //===============================================================

  return (
    <>
      <div className="Form">
     
        <img
          className="register-Pic"
          src="https://i.ibb.co/1dzGwfZ/Black-And-White-Modern-Menu-Template.png"
          alt="Black-And-White-Modern-Menu-Template"
          border="0"
        />
     
<div className="loginns">
        <input className="input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
    
        <input className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
  
        <button className="button"
          onClick={() => {
            loginn();
          
          }}
        >
          Login
        </button>
        <p>{message}</p>
</div>
      </div>
    </>
  );
};
