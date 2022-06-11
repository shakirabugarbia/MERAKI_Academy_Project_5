import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Admin = () => {
  return (
    <div className="main">
      <div></div>
      <table className="tabelss">
        <tr>
          <td>
            <Link className="linkss" to={"/UserAdminPanel"}>User Section</Link>
          </td>{" "}
          <td>
            <Link className="linkss" to={"/ProductAdminPanel"}>Product Section</Link>
          </td>
        </tr>{" "}
        <tr>
          <td>
            <Link className="linkss" to={"/"}>Category Section</Link>
          </td>
          <td>
            {" "}
            <Link className="linkss" to={"/"}>Foods type Section</Link>
          </td>
        </tr>
      </table>
    </div>
  );
};
export default Admin;
