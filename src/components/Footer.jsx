import React from "react";
//icons
import { GiLion } from "react-icons/gi";

const Footer = () => {
  return (
    <div className="">
      <a href="https://twitter.com/Azeez_ti">
        <div className="flex justify-center items-center py-2">
          <h1 className="text-white font-light lg:text-base text-sm">
            Developed by
          </h1>
          <div className="px-2 text-indigo-800">
            {/* <GiLion className="h-6 w-6 text-indigo-800" /> */}
            Azeez
          </div>
          <h1 className="text-white font-light lg:text-base text-sm">2022</h1>
        </div>
      </a>
    </div>
  );
};

export default Footer;
