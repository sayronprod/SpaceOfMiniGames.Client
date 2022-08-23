import { HubConnection } from "@microsoft/signalr";
import Phaser from "phaser";
import { BaseHeight } from "../PhaserGame";
import { BaseWidth } from "./../PhaserGame";

type Player = {
  userName: string;
  brush: Phaser.GameObjects.Image;
  brushIcon: Phaser.GameObjects.Image;
  playerNameObj: Phaser.GameObjects.Text;
};

export default class Paint extends Phaser.Scene {
  fps: Phaser.GameObjects.Text;
  rt: Phaser.GameObjects.RenderTexture;
  brush: Phaser.GameObjects.Image;
  currentBrushColor: number = 0xff0000;
  connection: HubConnection;
  currentBrushSize: number = 0.2;
  currentUserName: string;
  players: Player[] = [];
  brushIcon: Phaser.GameObjects.Image;
  currentPlayerNameObj: Phaser.GameObjects.Text;

  constructor(connection: HubConnection, currentUserName: string) {
    super("Paint");
    this.currentUserName = currentUserName;
    this.connection = connection;
  }

  preload() {
    this.load.image("brush", "assets/sprites/standartBrush.png");
    this.load.image("brushIcon", "assets/sprites/brushImage.png");
    this.sys.canvas.style.cursor = "none";
  }

  create() {
    this.rt = this.add
      .renderTexture(0, 0, BaseWidth, BaseHeight)
      .fill(0x282c34);

    this.brush = this.add
      .image(0, 0, "brush")
      .setScale(this.currentBrushSize)
      .setTint(this.currentBrushColor)
      .setVisible(false);
    this.brush.tintFill = true;

    const sendData = (
      posX: number,
      posY: number,
      isDown: boolean,
      isMove: boolean,
      interpolatedPositions: any[]
    ) => {
      this.connection.send("SendGameData", {
        userName: this.currentUserName,
        currentBrushColor: this.currentBrushColor,
        currentBrushSize: this.currentBrushSize,
        mouseInfo: {
          posX: posX,
          posY: posY,
          isDown: isDown,
          isMove: isMove,
          interpolatedPositions: interpolatedPositions,
        },
      });
    };

    this.input.on(
      "pointermove",
      (pointer: Phaser.Input.Pointer) => {
        this.brushIcon.setPosition(pointer.x + 24, pointer.y - 24);
        this.currentPlayerNameObj.setPosition(pointer.x, pointer.y - 70);
        let points: any[] = [];
        if (pointer.isDown) {
          points = pointer.getInterpolatedPosition(30);
          points.forEach((p) => {
            this.rt.draw(this.brush, p.x, p.y, 1);
          });
        }
        sendData(pointer.x, pointer.y, pointer.isDown, true, points);
      },
      this
    );

    this.input.on(
      "pointerdown",
      (pointer: Phaser.Input.Pointer) => {
        this.rt.draw(this.brush, pointer.x, pointer.y, 1);
        sendData(pointer.x, pointer.y, true, false, []);
      },
      this
    );

    this.connection.on("NewUserConnectedToGame", () => {
      this.rt.snapshot(
        (imageEl: any) => {
          this.connection.send("SendNewBackground", {
            backgroundImageData: imageEl.src,
          });
        },
        "image/png",
        1
      );
    });

    this.connection.on("ReceiveNewBackground", (data: any) => {
      if (!this.textures.exists("newBackground")) {
        this.textures
          .addBase64("newBackground", data.backgroundImageData)
          .on("onload", () => {
            this.rt.draw("newBackground", 0, 0, 1);
          });
      }
    });

    this.connection.on("ReceiveGameData", (data: any) => {
      let player = this.players.find((p) => p.userName === data.userName);
      if (!player) {
        let newBrush = this.add.image(0, 0, "brush").setVisible(false);
        newBrush.tintFill = true;
        let newBrushIcon = this.add.image(-100, -100, "brushIcon");
        let newPlayerNameObj = this.add
          .text(-100, -100, data.userName)
          .setBackgroundColor("#ffffff")
          .setColor("#000000")
          .setFontStyle("bold");
        player = {
          userName: data.userName,
          brush: newBrush,
          brushIcon: newBrushIcon,
          playerNameObj: newPlayerNameObj,
        };
        this.players.push(player);
      }
      player.brush
        .setScale(data.currentBrushSize)
        .setTint(data.currentBrushColor);
      player.brush.tintFill = true;

      player.brushIcon.setPosition(
        data.mouseInfo.posX + 24,
        data.mouseInfo.posY - 24
      );
      player.playerNameObj.setPosition(
        data.mouseInfo.posX,
        data.mouseInfo.posY - 70
      );

      if (data.mouseInfo.isDown && data.mouseInfo.isMove) {
        data.mouseInfo.interpolatedPositions.forEach((p: any) => {
          this.rt.draw(player?.brush, p.x, p.y, 1);
        });
      } else if (data.mouseInfo.isDown) {
        this.rt.draw(
          player?.brush,
          data.mouseInfo.posX,
          data.mouseInfo.posY,
          1
        );
      }
    });

    this.brushIcon = this.add.image(-100, -100, "brushIcon");
    this.currentPlayerNameObj = this.add
      .text(-100, -100, "You")
      .setBackgroundColor("#ffffff")
      .setColor("#000000")
      .setFontStyle("bold");

    this.fps = this.add.text(0, 0, "").setBackgroundColor("#000000");
    this.connection.send("ConnectToGame");
  }

  update(time: number, delta: number): void {
    this.fps.setText(Math.round(this.game.loop.actualFps).toString());
  }
}
