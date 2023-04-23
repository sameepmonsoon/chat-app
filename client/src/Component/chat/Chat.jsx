import React from "react";
import { userName } from "../Join/Join";
import socketIO from "socket.io-client";
import { useEffect } from "react";
import { RiChatHeartFill, IoMdSend, IoIosSend } from "react-icons/all";
const Chat = () => {
  const ENDPOINT = "http://localhost:8000/";
  const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

  useEffect(() => {
    socket.on("connect", () => {
      //   alert("connect");
    });
    console.log(socket);
    socket.emit("joined", { userName });
  }, [socket]);
  return (
    <div className="chat-page h-screen w-full flex items-center justify-center">
      <div className="chat-container h-3/4 w-[30%] bg-green-100">
        <div className="header h-[3rem] bg-green-400 flex justify-start items-center px-5">
          <RiChatHeartFill size={25} />
        </div>
        <div className="chatbox"></div>
        <div className="inputbox flex justify-start items-center h-10 p-[2px]">
          <input
            type="text"
            name="message"
            id="message"
            className="h-[96%] w-auto flex-1 outline outline-[1px] outline-green-700 p-2"
          />
          <button
            type="submit"
            className="send group min-w-[3rem] h-full flex items-center justify-center hover:opacity-[0.8] bg-green-400 border-[1px] border-green-900 opacity-100">
            <IoMdSend
              size={24}
              className="group-hover:translate-x-[2px] group-hover:opacity-[1] transition-all ease-linear duration-100 translate-x-0 translate-y-0"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
