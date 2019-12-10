import { zim } from '../../board.component';

// import { IceCream, IceCream2 } from './shapes';



export class ShapeFactory {
    shapesContainer: zim.Container;
    ice_cream;
    pot;
    crab;
    tea_cup;
    bee;

    constructor(private frame: zim.Frame) {
        this.ice_cream = this.frame.asset('ice_cream_cone.png').image;
        this.pot = this.frame.asset('pot.png').image;
        this.crab = this.frame.asset('crab.png').image;
        this.tea_cup = this.frame.asset('tea_cup.png').image;
        this.bee = this.frame.asset('bee.png').image;
    }

    makeShapes(n: number, shape: string) {
        let shapes_array: any[];
        switch (shape) {
            case 'circle':
                shapes_array = this.makeMany(n, 'circle');
                break;

            case 'rectangle':
                shapes_array = this.makeMany(n, 'rectangle');
                break;

            case 'triangle':
                shapes_array = this.makeMany(n, 'triangle');
                break;
            case 'ice cream':
                shapes_array = this.makeMany(n, 'ice cream');
                break;
            case 'bee':
                shapes_array = this.makeMany(n, 'bee');
                break;
            case 'pot':
                shapes_array = this.makeMany(n, 'pot');
                break;
            case 'crab':
                shapes_array = this.makeMany(n, 'crab');
                break;
            case 'tea cup':
                shapes_array = this.makeMany(n, 'tea cup');
                break;
            default:
                shapes_array = this.makeMany(n, 'rectangle');
                break;
        }

        return shapes_array;
    }

    private makeMany(n: number, Shape) {
        let shape;
        const shapesArray = [];


        for (let i = 0; i < n; ++i) {

            switch (Shape) {
                case 'rectangle':
                    shape = new zim.Rectangle({color: 'yellow'});
                    shapesArray.push(shape);
                    break;
                case 'triangle':
                    shape = new zim.Triangle({color: 'yellow'}).pos(90, 50);
                    shapesArray.push(shape);
                    break;
                case 'circle':
                    shape = new zim.Circle(50, 'white').pos(50, 50);
                    shapesArray.push(shape);
                    break;
                case 'ice cream':
                    shape = new zim.Bitmap(this.ice_cream, 200, 200).sca(0.18);
                    shapesArray.push(shape);
                    break;
                case 'bee':
                    shape = new zim.Bitmap(this.bee).sca(0.2).pos(30, 5);
                    shapesArray.push(shape);
                break;
                case 'pot':
                    shape = new zim.Bitmap(this.pot).sca(0.2).pos(0, 5);
                    shapesArray.push(shape);
                    break;
                case 'crab':
                    shape = new zim.Bitmap(this.crab).sca(0.2).pos(30, 7);
                    shapesArray.push(shape);
                    break;
                case 'tea cup':
                    shape = new zim.Bitmap(this.tea_cup).sca(0.2).pos(30, 8);
                    shapesArray.push(shape);
                    break;
                default:
                    shape = new zim.Rectangle();
                    shapesArray.push(shape);
                    break;
            }

        }
        return shapesArray;

    }
}
