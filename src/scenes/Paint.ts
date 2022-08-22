import { HubConnection } from "@microsoft/signalr";
import Phaser from "phaser";
import { BaseHeight } from "../PhaserGame";
import { BaseWidth } from "./../PhaserGame";

type Player = { userName: string; brush: Phaser.GameObjects.Image };

export default class Paint extends Phaser.Scene {
  fps: Phaser.GameObjects.Text;
  rt: Phaser.GameObjects.RenderTexture;
  brush: Phaser.GameObjects.Image;
  currentBrushColor: number = 0x000000;
  connection: HubConnection;
  currentBrushSize: number = 0.2;
  currentUserName: string;
  players: Player[] = [];

  constructor(connection: HubConnection, currentUserName: string) {
    super("Paint");
    this.currentUserName = currentUserName;
    this.connection = connection;

    this.connection.on("ReceiveGameData", (data: any) => {
      let player = this.players.find((p) => p.userName === data.userName);
      if (!player) {
        let newBrush = this.add.image(0, 0, "brush");
        newBrush.visible = false;
        newBrush.tintFill = true;
        player = { userName: data.userName, brush: newBrush };
        this.players.push(player);
      }
      player.brush.setScale(data.currentBrushSize);
      player.brush.setTint(data.currentBrushColor);
      player.brush.tintFill = true;

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
  }

  preload() {
    this.load.image("brush", "assets/sprites/standartBrush.png");
  }

  create() {
    this.rt = this.add.renderTexture(0, 0, BaseWidth, BaseHeight);

    this.fps = this.add.text(0, 0, "");

    this.brush = this.add.image(0, 0, "brush");
    this.brush.visible = false;
    this.brush.setScale(this.currentBrushSize);
    this.brush.setTint(this.currentBrushColor);
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
  }

  update(time: number, delta: number): void {
    this.fps.setText(this.game.loop.actualFps.toString());
  }
}
