import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  RiHomeFill,
  RiMoneyDollarCircleFill,
  RiExchangeFill,
  RiNewspaperFill,
} from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav
      className={`bg-secondary-light ${
        isOpen ? "!w-full sm:!w-80 fixed md:sticky" : "!w-24 sticky"
      } w-24 md:w-80 flex flex-col shadow-main h-screen md:sticky top-0 left-0 rounded-r-lg transition-all`}
    >
      <div className="top px-4 flex items-center space-x-1 justify-center border-b border-gray-100 md:py-4 py-2 transition-all">
        <span
          className="logoShape md:text-2xl text-xl font-bold tracking-tight cursor-pointer md:w-12 md:h-12 h-10 w-10 bg-secondary-dark text-secondary-light flex items-center justify-center rounded-full italic"
          onClick={() => setIsOpen(!isOpen)}
        >
          PK
        </span>
        <span
          className={`logoName font-bold text-secondary-dark text-lg md:text-xl hidden md:block ${
            isOpen ? "!block " : "!hidden"
          }`}
        >
          Crypto
        </span>
      </div>
      <div className="bottom flex-1 mt-7">
        <div
          className={`links flex flex-col items-center md:items-stretch ${
            isOpen ? "!items-stretch" : "!items-center"
          }`}
        >
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? { color: "#5B867C" } : null)}
            className={` px-4 py-3 flex items-center md:gap-4 hover:text-primary-dark text-primary-light transition-all ${
              isOpen ? "gap-2" : null
            }`}
            end
          >
            {({ isActive }) => (
              <>
                <span className="md:w-10 md:h-10 w-12 h-12 rounded-md border border-gray-100 flex items-center justify-center">
                  <RiHomeFill className="md:text-xl text-2xl" />
                </span>
                <span
                  className={`md:text-[16px] text-sm font-semibold hidden md:block ${
                    isOpen ? "!block" : "!hidden"
                  }`}
                >
                  Home
                </span>
                <div
                  className={`w-[6px] h-[6px] ml-auto rounded-full bg-primary-dark ${
                    isActive && isOpen ? "hidden md:block" : "hidden"
                  }`}
                />
              </>
            )}
          </NavLink>
          <NavLink
            to="cryptocurrencies"
            style={({ isActive }) => (isActive ? { color: "#5B867C" } : null)}
            className={` px-4 py-3 flex items-center md:gap-4 hover:text-primary-dark text-primary-light transition-all ${
              isOpen ? "gap-2" : null
            }`}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`md:w-10 md:h-10 w-12 h-12 rounded-md border border-gray-100 flex items-center justify-center`}
                >
                  <RiMoneyDollarCircleFill className="md:text-2xl text-3xl" />
                </span>
                <span
                  className={`md:text-[16px] text-sm font-semibold hidden md:block ${
                    isOpen ? "!block" : "!hidden"
                  }`}
                >
                  Cryptocurrencies
                </span>
                <div
                  className={`w-[6px] h-[6px] ml-auto rounded-full bg-primary-dark ${
                    isActive && isOpen ? "hidden md:block" : "hidden"
                  }`}
                />
              </>
            )}
          </NavLink>
          <NavLink
            to="exchanges"
            style={({ isActive }) => (isActive ? { color: "#5B867C" } : null)}
            className={` px-4 py-3 flex items-center md:gap-4 hover:text-primary-dark text-primary-light transition-all ${
              isOpen ? "gap-2" : null
            }`}
          >
            {({ isActive }) => (
              <>
                <span className="md:w-10 md:h-10 w-12 h-12 rounded-md border border-gray-100 flex items-center justify-center">
                  <RiExchangeFill className="md:text-2xl text-3xl" />
                </span>
                <span
                  className={`md:text-[16px] text-sm font-semibold hidden md:block ${
                    isOpen ? "!block" : "!hidden"
                  }`}
                >
                  Exchanges
                </span>
                <div
                  className={`w-[6px] h-[6px] ml-auto rounded-full bg-primary-dark ${
                    isActive && isOpen ? "hidden md:block" : "hidden"
                  }`}
                />
              </>
            )}
          </NavLink>
          <NavLink
            to="news"
            style={({ isActive }) => (isActive ? { color: "#5B867C" } : null)}
            className={` px-4 py-3 flex items-center md:gap-4 hover:text-primary-dark text-primary-light transition-all ${
              isOpen ? "gap-2" : null
            }`}
          >
            {({ isActive }) => (
              <>
                <span className="md:w-10 md:h-10 w-12 h-12 rounded-md border border-gray-100 flex items-center justify-center">
                  <RiNewspaperFill className="md:text-2xl text-3xl" />
                </span>
                <span
                  className={`md:text-[16px] text-sm font-semibold hidden md:block ${
                    isOpen ? "!block" : "!hidden"
                  }`}
                >
                  News
                </span>
                <div
                  className={`w-[6px] h-[6px] ml-auto rounded-full bg-primary-dark ${
                    isActive && isOpen ? "hidden md:block" : "hidden"
                  }`}
                />
              </>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
