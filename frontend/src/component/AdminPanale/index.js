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
        <h1 className="dash">Dash Bord</h1>
        <br/>
        <br/>
        <h3>Analize</h3>
        <br />
        <h3>Payments</h3>
        <br />
        <h3>Database</h3>
      </div>
      {isLoggedIn ? (
        <div className="admin_sections">
          <div className="section_link_1">
            <Link className="linkss" to={"/UserAdminPanel"}>
              User Section
            </Link>
            <img className="chart_Pic"
          src="https://i.ibb.co/xfkSCnV/1.png

          "
          alt="chart"
          border="0"
        />
          </div>{" "}
          <div className="section_link_2">
            <Link className="linkss" to={"/ProductAdminPanel"}>
              Product Section
            </Link>
            <img className="chart_Pic"
          src="https://i.ibb.co/QnkZ25K/4.png
          "
          alt="chart"
          border="0"
        />
          </div>{" "}
          <div className="section_link_3">
            <Link className="linkss" to={"/"}>
              Category Section
            </Link>
            <img className="chart_Pic"
          src="https://i.ibb.co/DkSHXVD/2.png
          "
          alt="chart"
          border="0"
        />
          </div>
          <div className="section_link_4">
            {" "}
            <Link className="linkss" to={"/"}>
              Foods type Section
            </Link>
            <img className="chart_Pic"
          src="https://i.ibb.co/b28fCdR/3.png
          "
          alt="chart"
          border="0"
        />
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
