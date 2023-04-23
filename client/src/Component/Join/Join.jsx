import React, { useState } from "react";
import { RiChatHeartFill } from "react-icons/all";
const Join = () => {
  const [user, setUser] = useState("");
  const handleChange = (e) => {
    setUser(e);
    console.log(user);
  };

  return (
    <div className="join-page h-screen w-full  flex items-center justify-center">
      <div className="join-container h-[25rem]  w-[25rem] flex flex-col items-center p-3 justify-start gap-10 border-[1px] border-gray-200">
        <RiChatHeartFill size={25} />
        <label
          htmlFor="email"
          className="w-[90%] flex flex-col justify-center items-start">
          <span className="self-start">Email</span>
          <input
            value={user}
            type="email"
            name="email"
            id="email"
            placeholder="email"
            className="h-10 w-[100%] outline outline-[1px] outline-gray-400 p-2"
            onChange={(e) => handleChange(e.target.value)}
          />
        </label>
        <label
          htmlFor="button"
          className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="p-1 w-[90%] h-10 border-[1px] border-gray-400 bg-gray-100 hover:bg-gray-200">
            Login
          </button>
        </label>
      </div>
    </div>
  );
};

export default Join;
