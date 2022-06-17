import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";

import { FaBeer } from "react-icons/fa";

import { GrLogout } from "react-icons/gr";

//===============================================================
import { zero } from "../../redux/reducers/basket/index";
const NavBar = () => {
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const basketState = useSelector((state) => {
    return {
      basket: state.basket.basket,
      amount: state.basket.amount,
      price: state.basket.price,
    };
  });

  return (
    <div className="NavBar">
      <div>
        <Link
          children
          to="/"
          onClick={() => {
            setView(false);
          }}
        >
          <img
            className="title80"
            src="https://i.ibb.co/RDmggP2/Bite-removebg-preview.png"
            alt="Bite-removebg-preview"
            border="0"
          />
        </Link>
      </div>

      <div className="navv">
        {isLoggedIn ? (
          <>
            <Link
              className="Link"
              to="/basket"
              onClick={() => {
                setView(true);
                localStorage.setItem("view", true);
              }}
            >
              Basket | {basketState.amount}
            </Link>
            {localStorage.getItem("view") ? (
              <Link className="Link" to="/Userorder">
                My Orders
              </Link>
            ) : (
              <></>
            )}
            <a
              className="Link"
              onClick={() => {
                dispatch(logout());
                navigate("/");
                setView(false);
                localStorage.removeItem("view");
                dispatch(zero())
              }}
            >
              <GrLogout className="log" /> Logout
            </a>
          </>
        ) : (
          <>
            <div className="d">
              <Link className="Link" to="/register">
                <AiOutlineUserAdd />
                Register
              </Link>
              <Link className="Link" to="/login">
                <AiOutlineUser /> Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
