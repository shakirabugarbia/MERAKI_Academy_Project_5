import React, { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="register">
      <br />
      <input
        type={"email"}
        placeholder="Email..."
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        type={"password"}
        placeholder="Password..."
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <input
        type={"text"}
        placeholder="User Name..."
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <br />
      <input
        type={"text"}
        placeholder="Phone Number..."
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <br />
      <input
        type={"text"}
        placeholder="Address..."
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <br />

      <button
        onClick={() => {
          axios
            .post("http://localhost:5000/register", {
              email,
              password,
              phoneNumber,
              userName,
              address,
              role_id: 1,
            })

            .then((result) => {
              if (result.data.success) {
                setMessage("Create account successfully");
              }
            })
            .catch((err) => {
              console.log(err.message);
              return setMessage("try again");
            });
        }}
      >
        Register
      </button>
      <p>{message}</p>
    </div>
  );
};
