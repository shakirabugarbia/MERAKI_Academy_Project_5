import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

import { useDispatch, useSelector } from "react-redux";

const Admin = () => {
  const navigate = useNavigate();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  return (
    <div className="main">
          <div className="analize">
            <h2>Analize</h2>
           <br/>
            <h2>Payments</h2>
            <br/>
            <h2>Data</h2>
          </div>
      {isLoggedIn ? (
        <div className="admin_sections">
          <div className="section_link">
            <Link className="linkss" to={"/UserAdminPanel"}>
              User Section
            </Link>
          </div>{" "}
          <div className="section_link">
            <Link className="linkss" to={"/ProductAdminPanel"}>
              Product Section
            </Link>
          </div>{" "}
          <div className="section_link">
            <Link className="linkss" to={"/"}>
              Category Section
            </Link>
          </div>
          <div className="section_link">
            {" "}
            <Link className="linkss" to={"/"}>
              Foods type Section
            </Link>
          </div>
        </div>
      ) : (
        <div className="login_first">
          Login first
          <button
            className="login_first_button"
            onClick={() => {
              navigate("/login");
            }}
          >
            go to login
          </button>
        </div>
      )}
    </div>
  );
};
export default Admin;
