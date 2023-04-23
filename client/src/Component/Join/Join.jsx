import React, { useState } from "react";
import { RiChatHeartFill } from "react-icons/all";
import { Link } from "react-router-dom";
let userName;
const Join = () => {
  const [user, setUser] = useState("");
  const handleChange = (e) => {
    setUser(e);
    console.log(user);
  };
  const sendUser = () => {
    userName = document.getElementById("username").value;
  };
  return (
    <div className="join-page h-screen w-full  flex items-center justify-center text-green-900">
      <div className="join-container h-[25rem] bg-green-200 w-[25rem] flex flex-col items-center p-3 justify-start gap-10 border-[1px] border-green-200">
        <RiChatHeartFill size={25} className="text-black" />
        <label
          htmlFor="username"
          className="w-[90%] flex flex-col justify-center items-start">
          <span className="self-start">Username</span>
          <input
            value={user}
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            className="h-10 w-[100%] outline outline-[1px] outline-green-400 p-2"
            onChange={(e) => handleChange(e.target.value)}
          />
        </label>
        <Link to={"/chat"} className="w-full flex justify-center items-center">
          <button
            onClick={(e) => {
              !user ? e.preventDefault() : null;
              sendUser();
            }}
            type="submit"
            className="p-1 w-[90%] h-10 border-[1px] bg-white border-green-400 hover:bg-green-300">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { userName };
