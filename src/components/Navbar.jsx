import React from "react";

const Navbar = () => {
  return (
    <div className=" flex justify-between p-3 bg-slate-600 text-white">
      <div className="logo">
        <span className='mx-5 text-xl'> iTask</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-semibold transition-all duration-1000">
          Home
        </li>
        <li className="cursor-pointer hover:font-semibold transition-all duration-1000">
          Your Tasks
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
