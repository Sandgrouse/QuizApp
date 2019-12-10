import { Button } from '../';
import Phaser from 'phaser';

export interface IRexButtonConfig {
    x?: number;
    y?: number;
    color?: number;
    name?: string;
}

export declare class RexButton extends Phaser.GameObjects.Graphics {
    scene: Phaser.Scene;
    gameObject: Phaser.GameObjects.Graphics;

    resetFromJSON(o): IRexButton;

    boot();

    shutdown();

    destroy();

    setEnable(e);

    setMode(m);

    setClickInterval(interval);

    setDragThreshold(distance);

    // internal
    onPress(pointer);

    onRelease(pointer);

    onPointOut(pointer);

    onMove(pointer);

    click(nowTime, pointer): IRexButton;

    cancel(): IRexButton;
}

export interface IRexButton {
    scene: Phaser.Scene;
    gameObject: Phaser.GameObjects.Graphics;

    resetFromJSON(o): IRexButton;

    boot();

    shutdown();

    destroy();

    setEnable(e);

    setMode(m);

    setClickInterval(interval);

    setDragThreshold(distance);

    // internal
    onPress(pointer);

    onRelease(pointer);

    onPointOut(pointer);

    onMove(pointer);

    click(nowTime, pointer): IRexButton;

    cancel(): IRexButton;
}

export interface IButtonPlugin extends Phaser.Plugins.BasePlugin  {
    add(gameObject: any, config: IRexButtonConfig): RexButton;
}
