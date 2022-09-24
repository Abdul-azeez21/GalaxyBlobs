import React, { useState } from "react";
import FaqData from "./FaqData";
//icon
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

const Faq = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };
  return (
    <div className="lg:p-8 md:p-8 p-6">
      <h1 className="font-bold text-white/75 lg:text-2xl text-lg py-3">
        Frequently Asked Questions
      </h1>
      <div className="grid grid-cols-1 gap-y-5  items-center justify-center">
        {FaqData.map((item, index) => {
          return (
            <div
              onClick={() => toggle(index)}
              key={index}
              className="rounded-md bg-indigo-900/75 shadow-lg"
            >
              <button className="flex justify-between items-center w-full py-3 px-5">
                <span className="lg:text-lg text-sm text-white font-medium">
                  {item.question}
                </span>
                <div>
                  {clicked === index ? (
                    <HiChevronUp className="h-4 w-4 text-black" />
                  ) : (
                    <HiChevronDown className="h-4 w-4 text-black" />
                  )}
                </div>
              </button>
              {clicked === index ? (
                <div className="bg-indigo-900/50 flex justify-between items-center w-full py-3 px-5">
                  <span className="lg:text-base text-xs text-white font-normal">
                    {item.answer}
                  </span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
