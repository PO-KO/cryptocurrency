import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-secondary-light shadow-main">
      <div className="wrapper flex flex-col md:flex-row gap-2 items-center px-3 sd:px-7 py-3 justify-between">
        <div className="left">
          <div className=" flex items-center space-x-1">
            <span className="logoShape md:text-xl text-lg font-bold tracking-tight cursor-pointer md:w-10 md:h-10 h-8 w-8 bg-secondary-dark text-secondary-light flex items-center justify-center rounded-full italic">
              PK
            </span>
            <span
              className={`logoName font-bold text-secondary-dark text-base md:text-lg `}
            >
              Crypto
            </span>
          </div>
          <p className="text-xs mt-1">All Rights Reserved</p>
        </div>
        <div className="center">
          <div className="social flex items-center justify-center space-x-8">
            <a href="#" className="group">
              <FaFacebook className="text-xl text-[#3b5998] group-hover:text-primary-dark transition-colors" />
            </a>
            <a href="#" className="group">
              <AiFillInstagram className="text-2xl text-[#C13584] group-hover:text-primary-dark transition-colors" />
            </a>
            <a href="#" className="group">
              <FaLinkedin className="text-xl text-[#0e76a8] group-hover:text-primary-dark transition-colors" />
            </a>
            <a href="#" className="group">
              <FaTwitter className="text-xl text-[#1DA1F2] group-hover:text-primary-dark transition-colors" />
            </a>
          </div>
        </div>
        <div className="right">
          <div className="links flex space-x-2">
            <Link to="Home" className=" text-sm">
              Home
            </Link>
            <Link to="cryptocurrencies" className=" text-sm">
              Cryptocurrencies
            </Link>
            <Link to="exchanges" className=" text-sm">
              Exchanges
            </Link>
            <Link to="news" className=" text-sm">
              News
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
