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
      {isLoggedIn ? (
        <table className="tabelss">
          <tr>
            <td>
              <Link className="linkss" to={"/UserAdminPanel"}>
                User Section
              </Link>
            </td>{" "}
            <td>
              <Link className="linkss" to={"/ProductAdminPanel"}>
                Product Section
              </Link>
            </td>
          </tr>{" "}
          <tr>
            <td>
              <Link className="linkss" to={"/"}>
                Category Section
              </Link>
            </td>
            <td>
              {" "}
              <Link className="linkss" to={"/"}>
                Foods type Section
              </Link>
            </td>
          </tr>
        </table>
      ) : (
        <div>
          Login first
          <button
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
