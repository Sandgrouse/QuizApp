export interface IContainerLite extends Phaser.GameObjects.Zone {


    x: number;
    y: number;
    rotation: number;
    add(gameObject: any, proportion?: number, align?: string, paddingConfig?, expand?: boolean): this;
    addMultiple(gameObjects): this;
    destroy(fromScene: boolean): void;
    clear(destroyChild: boolean): void;

    resize(width: number, height: number): this;


    // Compatiable with container plugin
    list(): any;
}
