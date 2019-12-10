import { SceneBase } from '../../languages/game/scenes/scene.base';
import { IProgressBar } from './interfaces';

export class ProgressBar implements IProgressBar  {

    private container: Phaser.GameObjects.Graphics;
    private bar: Phaser.GameObjects.Graphics;
    public count = 0;

    // Config object used in creating the size of the progress bar
    configObj: Phaser.Types.GameObjects.Graphics.Options;

    // Properties of the progress bar
    barWidth: number;
    barHeight: number;
    barCorner: number;
    colour = 0xffffff;
    backgroundColour = 0x222222;
    steps = 10;
    scene: Phaser.Scene | SceneBase;
    text: string;
    progressText: Phaser.GameObjects.Text;

    constructor (scene: Phaser.Scene | SceneBase, config: Phaser.Types.GameObjects.Graphics.Options,
        width: number, height: number, corner: number, colour?: number, steps?: number) {

        if (colour) {
            this.colour = colour;
        }

        if (steps) {
            this.steps = steps;
        }


        this.container = scene.add.graphics();
        this.bar = scene.add.graphics();
        this.scene = scene;


        this.bar.fillStyle(this.colour, 1);
        this.barWidth = width;
        this.barHeight = height;
        this.barCorner = corner;
        this.configObj = config;

        this.container.fillStyle(this.backgroundColour, 0.8);
        this.container.fillRoundedRect(config.x, config.y, width, height, corner);
        this.infoText();
    }

    public increaseCount () {

        if (this.count < this.barWidth) {
            this.count = this.count + (1 / this.steps * this.barWidth);
            this.bar.fillRoundedRect(this.configObj.x, this.configObj.y, this.count, this.barHeight, this.barCorner);
            if (this.count >= 1 / 2 * this.barWidth) {
                this.progressText.destroy();
                this.infoText('WELL DONE!');
            }
         } else {
             this.count = 0;
             this.bar.clear();
             this.progressText.destroy();

             this.infoText();
             this.bar.fillStyle(this.colour, 1);
        }

        return this;
    }

    public removeFromScene() {
        this.container.destroy();
        this.bar.destroy();
        this.progressText.destroy();
    }

    public infoText(text?: string) {
        if (text) {
            this.text = text;
        } else {
            this.text = 'PROGRESS...';
        }

        this.progressText = this.scene.make.text({
            x: this.configObj.x / 2,
            y: this.configObj.y / 2 - 140,
            text: this.text,
            style: {
                font: '14px monospace',
                fill: '#ffffff'
            }
        });
        this.progressText.setOrigin(0.5, 0.5);

        return this;
    }
}
