import React, { useEffect } from "react";
//icon
import { FaSpaceShuttle } from "react-icons/fa";

const Loader = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => setTimeout(timer);
  });
  return (
    <div>
      <div className="bg-black flex justify-center items-center w-screen h-screen">
        <div className="animate-pulse">
          <FaSpaceShuttle className="text-white/75 lg:h-10 lg:w-10 md:h-10 md:w-10 h-8 w-8 -rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
