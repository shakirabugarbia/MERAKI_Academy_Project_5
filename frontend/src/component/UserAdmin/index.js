import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { setUsers } from "../../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserAdminSide = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  //   const [users, setUsers] = useState([]);

  const { token, isLoggedIn, users } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      users: state.auth.users,
    };
  });

  const getUsers = (String) => {
    axios.get(`http://localhost:5000/user/`).then((result) => {
      dispatch(setUsers(result.data.result));
      setShow(true);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="All_Users">
      <table className="tabel">
        <tr>
          <th>userName</th>
          <th>Email</th>
          <th>phoneNumber</th>
          <th>Order History</th>
        </tr>

        {show &&
          users.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element.userName}</td>
                <td>{element.email}</td>

                <td> {element.phoneNumber}</td>
                <td>
                  <button
                    className="OrderH"
                    onClick={() => {
                      console.log(element.id);
                      navigate("/viewTable");
                    }}
                  >
                    view
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default UserAdminSide;
