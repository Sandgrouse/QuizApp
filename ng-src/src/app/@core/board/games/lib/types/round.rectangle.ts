export interface IRoundRectangle extends Phaser.GameObjects.Shape {
    width: number;
    height: number;
    iteration: number;
    radius: number;
    cornerRadius: number;


    updateData(): IRoundRectangle;

    resize(width: number, height: number): IRoundRectangle;

    setIteration(iteration): IRoundRectangle;

    setRadius(value: number): IRoundRectangle;

    setCornerRadius(value: number): number;
}
