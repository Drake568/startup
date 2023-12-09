import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./views/login";
import Compose from "./views/compose";
import Explore from "./views/explore";
import { Home } from "./views/home";
import Register from "./views/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebSocketProvider } from "./components/Websocket";

export default function App() {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <ToastContainer />
        <div>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
