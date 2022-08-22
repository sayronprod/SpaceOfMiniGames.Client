import "./Games.css";
import { defaultGameConfig } from "./../../PhaserGame";
import { useEffect } from "react";
import Paint from "./../../scenes/Paint";

const Games = () => {
  let game: Phaser.Game;

  useEffect(() => {
    game = new Phaser.Game(defaultGameConfig);
    game.scene.add("Paint", Paint, true);
  }, []);

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
