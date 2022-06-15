import React from "react";
import { Link } from "react-router-dom";

import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillApple,
} from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import "./style.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="sub">
          <div className="co">
            <b>Company</b>
            <br />
            <Link className="suggestions" to={"/contactUS"}>
              About
            </Link>
            <br />
            <Link className="suggestions" to={"/contactUS"}>
              Blog
            </Link>
            <br/>
            <Link className="suggestions" to={"/contactUS"}>
             Contact Us
            </Link>
          </div>
          <div>
            <b>For Foodies</b>
            <p>Code of conduct</p>
            <p>Community</p>
          </div>
          <div className="For_restaurant">
            <b> For Restaurant</b>
            <br />
            <Link className="suggestions" to={"/"}>
              Restauran
            </Link>
            <br />
            <Link className="suggestions" to={"/"}>
              Business
            </Link>
            <br />
            <Link className="suggestions" to={"/location"}>
              Our Location
            </Link>
          </div>
          <div>
            <b>For You</b>
            <br />
            <Link className="suggestions" to={"/"}>
              Privacy
            </Link>
            <br />
            <Link className="suggestions" to={"/"}>
              Security
            </Link>
            <br />
            <Link className="suggestions" to={"/"}>
              Terms
            </Link>
          </div>
          <div>
            <b>Social links</b>
            <div>
              <AiFillFacebook />
              <AiFillTwitterCircle />
              <AiFillInstagram />
            </div>
            <div>
              <AiFillApple />
              <FaGooglePlay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
