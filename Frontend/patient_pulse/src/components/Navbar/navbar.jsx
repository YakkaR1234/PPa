import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import { useState } from "react";

const Navbar = () => {


  const navigate = useNavigate();

  const onLogOut = () => {
    navigate("/logout");
  };

 

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h1 className="text-xl font-medium text-black py-2">Notes</h1>

      

      <ProfileInfo onLogOut={onLogOut} />
    </div>
  );
};

export default Navbar;
