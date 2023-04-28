import React, { useState } from "react";
import { userName } from "../Join/Join";
import socketIO from "socket.io-client";
import { useEffect } from "react";
import { RiChatHeartFill, IoMdSend, IoIosSend } from "react-icons/all";
import Message from "../message/message";
import ReactScrollToBottom from "react-scroll-to-bottom";
let socket;

const ENDPOINT = "http://localhost:8000";
const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("message")?.value;
    socket.emit("message", { message, id });
    document.getElementById("message").value = "";
  };

  console.log(messages);
  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setid(socket.id);
    });
    console.log(socket);
    socket.emit("joined", { userName });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("leave");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);
  return (
    <div className="chat-page h-screen w-full flex items-center justify-center">
      <div className="chat-container lg:h-3/4 sm:h-[70%] h-[50%] min-w-[40%] lg:min-w-[30%] bg-green-100 flex flex-col items-start justify-between">
        <div className="header h-[3rem] bg-green-400 flex justify-start items-center px-5 w-full">
          <RiChatHeartFill size={25} />
        </div>
        <div className="chatbox flex-1 bg-red flex flex-col justify-start items-start gap-5 py-1 overflow-y-scroll overflow-x-hidden h-auto w-full ">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </div>
        <div className="inputbox flex justify-start items-center h-10 p-[2px] w-full">
          <input
            type="text"
            name="message"
            id="message"
            className="h-[96%] w-auto flex-1 outline outline-[1px] outline-green-700 p-2"
          />
          <button
            type="submit"
            onClick={send}
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
