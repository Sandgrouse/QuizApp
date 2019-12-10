import { SceneBase } from '../../languages/game/scenes/scene.base';

export interface IProgressBar {
    count: number;
    colour: number;
    backgroundColour: number;
    barWidth: number;
    barHeight: number;
    barCorner: number;
    steps: number;
    scene: Phaser.Scene | SceneBase;
    text: string;
    progressText: Phaser.GameObjects.Text;
    configObj: Phaser.Types.GameObjects.Graphics.Options;

   // Methods
    increaseCount(): this;
    infoText(): this;
    removeFromScene(): void;
}
