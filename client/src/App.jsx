import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import socketIO from "socket.io-client";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import Join from "./Component/Join/Join";
const ENDPOINT = "http://localhost:8000";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

function App() {
  const [count, setCount] = useState(0);
  socket.on("connect", () => {});

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Join />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>{" "}
    </>
  );
}

export default App;
