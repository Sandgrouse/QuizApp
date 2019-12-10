// Import all required counting classes and helper functions
import { Question } from './question';
import { ShapeFactory } from '../shape.Factory';
import { zim, zik, zop, zog } from '../../../board.component';



export class HowManyQuestion extends Question {
    shapeTypes: string[]; // Diffrent shape types selected randomly
    shapeFactory: ShapeFactory; // Shape factory class creates shape objects

    // rows for positioning shapes
    row1: zim.Container;
    row2: zim.Container;
    // answerPicker: zim.Stepper; // Zim.stepper for picking answers to questions

    constructor (sF: ShapeFactory) {
        super();
        this.type = 'Count total';
        this.shapeTypes = ['circle', 'rectangle', 'triangle', 'ice cream', 'bee', 'pot', 'crab', 'tea cup'];
        // this.shapeTypes = ['circle', 'triangle'];
        this.shapeFactory = sF;
        this.row1 = new zim.Container(700, 100).alp(0).animate({obj: {alpha: 1 }, time: 1000});
        this.row2 = new zim.Container(700, 100).alp(0).animate({obj: {alpha: 1 }, time: 1000});
        this.row1.x = 120;
        this.row1.y = 30;

        this.row2.x = 120;
        this.row2.y = 170;
        this.createQuestion();
    }

    // Function for creating a question object
    createQuestion() {
        const shape: string = zik(this.shapeTypes);

        this.numOfShapes = zim.rand(1, 10);
        this.correct_answer = this.numOfShapes;

        const shapesArray = this.shapeFactory.makeShapes(this.numOfShapes, shape);
        const answer_picker = this.createAnswerPicker();
        this.shapes = this.positionShapes(shapesArray);
        this.shapes.addChild(answer_picker);
        this.text = 'How many ' + shape + 's' + ' are there?';

    }

    // Function for creating a the answer picker object
    private createAnswerPicker () {
        this.answerPicker = new Stepper({
            list: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            vertical: true,
            stepperType: 'number',
            min: 0,
            max: 10,
            // label: answerInstruction
        });

        this.answerPicker.pos(750, 330).sca(0.5);
        return this.answerPicker;
        // this.answerPicker.currentValue = 0;
    }

    // Function for positioning shapes on the stage
    private positionShapes(shapesArray: any[]): zim.Container {
        const shapes = new zim.Container(900, 500).alp(0).animate({obj: {alpha: 1 }, time: 500});
        shapes.x = 70;
        shapes.y = 70;

        shapes.drag();

        function arrangeShapes (shape: zim.Shape, dist: number) {
            if ( shape.type === 'Triangle') {
                shape.y = dist;
            } else if (shape.type === 'Circle') {
                shape.y = dist;
                // row2.x = 60;
            }  else {
            }
        }

        for (let index = 0; index < shapesArray.length; index++) {
            const shape: zim.Shape = shapesArray[index];

            if (index >= 5) {
                this.row2.addChild(shape);
                shape.x = ((this.row2.x * index) + 60 - 600);
                arrangeShapes(shape, 50);
            } else {
                this.row1.addChild(shape);
                shape.x = (this.row1.x * index) + 60;
                arrangeShapes(shape, 50);
            }
        }

        shapes.addChild(this.row1, this.row2);
        this.row1.outline(), this.row2.outline();

        return shapes;
    }


}
