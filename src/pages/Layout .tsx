import { Outlet, useOutletContext } from "react-router-dom";
import Chat from "../components/chat/Chat";
import Header from "../components/header/Header";
import Room from "../components/room/Room";
import { useAppSelector } from "../hooks/redux";
import "./Layout.css";
import { useEffect, useState } from "react";
import { checkToken } from "./../helpers/tokenHelper";
import {
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions,
} from "@microsoft/signalr";
import { HubUrl } from "../global";
import { useAppDispatch } from "./../hooks/redux";
import { userSlice } from "../store/reducers/UserSlice";

type ContextType = { connection: HubConnection | null };

const Layout = () => {
  const { userToken } = useAppSelector((state) => state.userReducer);
  const [isValidTonen, setIsValidToken] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const dispatch = useAppDispatch();
  const { setConnectionStatus } = userSlice.actions;

  useEffect(() => {
    setIsValidToken(checkToken(userToken));
  }, [userToken]);

  useEffect(() => {
    if (isValidTonen) {
      const options: IHttpConnectionOptions = {
        accessTokenFactory: () => {
          return userToken?.token!;
        },
      };

      const newConnection = new HubConnectionBuilder()
        .withUrl(HubUrl, options)
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
    }
  }, [isValidTonen]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          connection.on("ReceiveMessage", (message) => {
            console.log(message);
          });

          dispatch(setConnectionStatus(true));
          // connection.send("SendMessage", "test");
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

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
        <Outlet context={{ connection }} />
      </div>
    </div>
  );
};

export function useConnection() {
  return useOutletContext<ContextType>();
}

export default Layout;
