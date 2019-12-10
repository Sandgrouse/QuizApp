import { IBaseSizer } from './basesizer';

export interface ISizer extends IBaseSizer {

    setOrientation(orientation: number | string): ISizer;

    add(gameObject: Phaser.GameObjects.GameObject, proportion: number, align: string, paddingConfig, expand: boolean): this;

    insert(index: number, gameObject: Phaser.GameObjects.GameObject, proportion: number,
        align: string, paddingConfig, expand: boolean): ISizer;

    remove(gameObject: Phaser.GameObjects.GameObject): ISizer;

    clear(destroyChild: boolean): ISizer;

    childrenProportion(): number;

    layout(parent?, newWidth?: number, newHeight?: number): this;

    getElement(value: string):  Phaser.GameObjects.Text;
}
