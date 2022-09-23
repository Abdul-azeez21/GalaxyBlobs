import React from "react";
//
import { FaSpaceShuttle } from "react-icons/fa";
const Navbar = () => {
  return (
    <div>
      <nav className="absolute top-0 left-0 right-0 flex place-content-between mx-5 my-3 px-4 lg:px-10 py-3 items-center backdrop-blur-sm bg-gray-800/50 shadow-md rounded-lg">
        <div className="">
          <a href="/">
            <h1 className="text-white lg:text-xl text-base font-semibold">
              Galaxy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-500 ">
                Blobs
              </span>
            </h1>
          </a>
        </div>

        <div>
          <a href="/">
            <FaSpaceShuttle className="lg:h-5 lg:w-5 h-4 w-4 text-white/90" />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
