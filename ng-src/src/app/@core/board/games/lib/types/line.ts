export interface ILinePlugin extends Phaser.Plugins.BasePlugin {
    start(): void;
}

export interface ILine extends Phaser.GameObjects.RenderTexture {
    x0(value?: number): void | number;

    y0(value?: number): void | number;


    x1(value?: number): void | number;


    y1(value?: number): void | number;

    setLineStartPosition(x: number, y: number): ILine;

    setLineEndPosition(x: number, y: number): ILine;

    setLineStartTexture(key: string, frame): ILine;

    setLineEndTexture(key: string, frame): ILine;

    setLineBodyTexture(key, frame, width: number): ILine;

    updateLineTexture(): ILine;

    renderWebGL(renderer, src, interpolationPercentage, camera, parentMatrix): ILine;

    renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix);
}
