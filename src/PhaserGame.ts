import Phaser from "phaser";

export const BaseWidth = 1920;
export const BaseHeight = 1080;

export const defaultGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "#282c34",
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    width: BaseWidth,
    height: BaseHeight,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  disableContextMenu: false,
};
