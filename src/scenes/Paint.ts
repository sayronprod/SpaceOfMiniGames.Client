import Phaser from "phaser";
import { BaseHeight } from "../PhaserGame";
import { BaseWidth } from "./../PhaserGame";

export default class Paint extends Phaser.Scene {
  fps: Phaser.GameObjects.Text;
  graphics: Phaser.GameObjects.Graphics;
  rt: Phaser.GameObjects.RenderTexture;
  brush: Phaser.GameObjects.Image;

  constructor() {
    super("Paint");
  }

  preload() {
    this.load.image("brush", "assets/sprites/standartBrush.png");
  }

  create() {
    this.rt = this.add.renderTexture(0, 0, BaseWidth, BaseHeight);

    this.fps = this.add.text(0, 0, "");
    this.brush = this.add.image(0, 0, "brush");
    this.brush.visible = false;
    this.brush.setScale(0.2);

    this.input.on(
      "pointermove",
      (pointer: Phaser.Input.Pointer) => {
        if (pointer.isDown) {
          let points = pointer.getInterpolatedPosition(30);
          let color = 0xff0000;
          this.brush.setTint(color);
          this.brush.tintFill = true;
          points.forEach((p) => {
            this.rt.draw(this.brush, p.x, p.y, 1);
          });
        }
      },
      this
    );

    this.input.on(
      "pointerdown",
      (pointer: Phaser.Input.Pointer) => {
        let color = 0xffffff;
        this.brush.setTint(color);
        this.brush.tintFill = true;
        this.rt.draw(this.brush, pointer.x, pointer.y, 1);
      },
      this
    );
  }

  update(time: number, delta: number): void {
    this.fps.setText(this.game.loop.actualFps.toString());
  }
}
