import { IContainerLite } from './containeLite';

export interface IBaseSizer extends IContainerLite {


    setMinSize(minWidth: number, minHeight: number): IBaseSizer;

    setMinWidth(minWidth: number): IBaseSizer;

    setMinHeight(minHeight: number): IBaseSizer;

    childrenWidth(): number;

    childrenHeight(): number;

    left(value?: number): void | number;

    alignLeft(value: number): IBaseSizer;

    right(value?: number): void | number;

    alignRight(value: number): IBaseSizer;

    centerX(value?: number): number;


    alignCenterX(value: number): IBaseSizer;

    top(value?: number): number;

    alignTop(value: number): IBaseSizer;

    bottom(value?: number): void | number;

    alignBottom(value): IBaseSizer;

    centerY(): number;

    alignCenterY(value: number): IBaseSizer;

    pin(gameObject: Phaser.GameObjects.GameObject): IBaseSizer;

    addBackground(gameObject: Phaser.GameObjects.GameObject): IBaseSizer;
}
