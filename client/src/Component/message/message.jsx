import React from "react";

const Message = ({ user, message, classs }) => {
  if (user) {
    return (
      <div className="flex flex-col justify-start items-start bg-green-200/80 min-h-[4rem] h-auto w-3/5 pl-1 pr-10">
        <p className="px-0 min-w-[20%]  max-w-full rounded-sm">{`${user}:`}</p>
        <p>{`${message}`}</p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-start items bg-green-300 min-h-[4rem] h-auto w-3/5 pl-1 pr-10">
        <p className="px-0 min-w-[20%]  max-w-full rounded-sm">{`You:`}</p>
        <p>{`${message}`}</p>
      </div>
    );
  }
};

export default Message;
