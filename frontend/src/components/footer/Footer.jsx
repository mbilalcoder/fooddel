import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-content">
        <div className="footer-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
            dignissimos corrupti ipsa explicabo delectus quas necessitatibus
            consequatur porro deleniti expedita.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About US</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+0214 98545</li>
            <li>email@email.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p>copyright 2025 @ websit.com - All right reserved.</p>
    </div>
  );
};

export default Footer;
