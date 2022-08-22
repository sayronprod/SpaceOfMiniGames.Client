import "./Games.css";
import { defaultGameConfig } from "./../../PhaserGame";
import { useEffect } from "react";
import Paint from "./../../scenes/Paint";
import { useConnection } from "./../Layout ";
import { useAppSelector } from "../../hooks/redux";
import { HubConnectionState } from "@microsoft/signalr";

const Games = () => {
  const { userInfo, isConnected } = useAppSelector(
    (state) => state.userReducer
  );
  let game: Phaser.Game;

  const { connection } = useConnection();

  useEffect(() => {
    if (isConnected) {
      game = new Phaser.Game(defaultGameConfig);
      game.scene.add("Paint", new Paint(connection!, userInfo?.login!), true);
    }
  }, [isConnected]);

  return (
    <div className="game-component">
      <div>
        <h1>Games</h1>
      </div>
      <div className="game-conteiner">
        <div id="phaser-container"></div>
      </div>
    </div>
  );
};

export default Games;
