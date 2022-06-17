import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { setUsers } from "../../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addOrder, setItems, setId } from "../../redux/reducers/order";

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
  const orderState = useSelector((state) => {
    return {
      order: state.order.order,
      items: state.order.items,
      id: state.order.id,
    };
  });
  const block = (id) => {
    axios
      .put(`https://bigbites-backend.herokuapp.com/user/${id}`)
      .then((result) => {
        getUsers();
      })
      .catch((err) => {});
  };
  const active = (id) => {
    axios
      .put(`https://bigbites-backend.herokuapp.com/user/active/${id}`)
      .then((result) => {
        getUsers();
      })
      .catch((err) => {});
  };
  const getUsers = (String) => {
    axios
    .get(`https://bigbites-backend.herokuapp.com/user/`).then((result) => {
      dispatch(setUsers(result.data.result));
      setShow(true);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="All_Users">
      {isLoggedIn ? (
        <>
          <table className="tabel">
            <tr >
              <th>User.Name</th>
              <th>User.Email</th>
              <th>Phone.Number</th>
              <th>Order.History</th>
              <th>User.Status</th>
              <th>User.Status</th>
            </tr>

            {show &&
              users.map((element, index) => {
                return (
                  <tr key={index}>
                    <td className="tabel">{element.userName}</td>
                    <td className="tabel">{element.email}</td>

                    <td className="tabel"> {element.phoneNumber}</td>
                    <td className="tabel">
                      <button
                        className="OrderH"
                        onClick={() => {
                          console.log(element.id);
                          dispatch(setId(element.id));
                          navigate("/viewTable");
                        }}
                      >
                        view
                      </button>
                    </td>
                    <td>
                      {element.is_deleted === 0 ? <>active</> : <>blocked</>}
                    </td>
                    <td>
                      {element.is_deleted === 0 ? (
                        <button
                          className="OrderH"
                          onClick={() => {
                            block(element.id);
                          }}
                        >
                          block OR active
                        </button>
                      ) : (
                        <button
                          className="OrderH"
                          onClick={() => {
                            active(element.id);
                          }}
                        >
                          block OR active
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </table>
         
        </>
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

export default UserAdminSide;
