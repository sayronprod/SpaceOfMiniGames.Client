import { Outlet } from "react-router-dom";
import Chat from "../components/chat/Chat";
import Header from "../components/header/Header";
import Room from "../components/room/Room";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="grid-container">
      <div className="header">
        <Header />
      </div>

      <div className="left" style={{ backgroundColor: "lightblue" }}>
        <div className="chat">
          <Chat />
        </div>
        <div className="room">
          <Room />
        </div>
      </div>
      <div className="middle">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
