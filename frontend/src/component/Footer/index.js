import React from "react";
import { Link } from "react-router-dom";

import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillApple
} from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import "./style.css";

export const Footer = () => {
  return (
    <div className="footer">
      
        <div className="footer-content">
          
          <div className="sub">
            <div>
              <b>Company</b>
              <p>About</p>
              <p>Blog</p>
              <Link className="suggestions" to={"/contactUS"}>suggestion</Link>
            </div>
            <div>
              <b>For Foodies</b>
              <p>Code of conduct</p>
              <p>Community</p>
            </div>
            <div>
              <b>For Restaurant</b>
              <p>Restaurant</p>
              <p>Business</p>
              <Link className="suggestions"  to={"/location"}>Location</Link>
            </div>
            <div>
              <b>For You</b>
              <p>Privacy</p>
              <p>Security</p>
              <p>Terms</p>
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