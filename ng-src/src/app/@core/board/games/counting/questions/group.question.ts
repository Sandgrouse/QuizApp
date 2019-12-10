/// <reference types="zim" />

// Import all required counting classes and helper functions
import { Question } from './question';
import { ShapeFactory } from '../shape.Factory';
import { positionUniqueShapes } from '../composition'; // helper function
import { zim, zik, zop, zog } from '../../../board.component';





export class PickGroupQuestion extends Question {
    shapeTypes: string[]; // Diffrent shape types selected randomly
    shapeFactory: ShapeFactory; // Shape factory class creates shape objects

    offColor = '#1A5A77';
    onColor = 'green';

    // group of shapes
    group1: zim.Container;
    group2: zim.Container;

    constructor (sF: ShapeFactory) {
        super();
        this.type = 'pick group';
        this.shapeTypes = ['circle', 'rectangle', 'triangle', 'bee', 'pot', 'crab', 'tea cup'];
        // this.shapeTypes = ['circle', 'circle'];
        this.shapeFactory = sF;
        this.shapes = new zim.Container(900, 500); // Main shape container inherited from parent question class
        this.shapes.pos(70, 70);
        this.createQuestion();
    }

    // Function for creating a question object
    createQuestion() {
        const shape: string = zik(this.shapeTypes);
        // let correct_answer = this.correct_answer;

        // Select a random number of shapes to be created in each group
        const numOfShapes1 = zim.rand(1, 4);
        const numOfShapes2 = zim.rand(5, 8);

        const group_x: number = zik([230, 670]); // randomly select the horizontal position of a group

        // creates group of shapes
        const shapes1 = this.shapeFactory.makeShapes(numOfShapes1, shape);
        const shapes2 = this.shapeFactory.makeShapes(numOfShapes2, shape);

        const that = this;

        // Position shapes, add to group and animate how they are added to the stage
        const group1 = this.positionShapes(shapes1).alp(0).animate({obj: {alpha: 1 }, time: 700});
        group1.name = 'Group 1';
        const group2 = this.positionShapes(shapes2).alp(0).animate({obj: {alpha: 1 }, time: 700});
        group2.name = 'Group 2';

        group1.x = group_x;

        // Switch a group's horizontal position randomly
        if (group1.x === 670) {
            group2.x = 230;
        } else {
            group2.x = 670;
        }

        this.group1 = group1;
        this.group2 = group2;

        function setQuestionAndAnwer (type: string) {

            if (type === 'more') {
                that.text = 'Which group has more ' + shape + 's?'; // 'this.text' is inherited from parent class
                that.correct_answer = group2.name;
            } else if (type === 'more number of shapes') {
                that.text = 'Which group has ' + numOfShapes2 + ' ' + shape + 's?'; // 'this.text' is inherited from parent class
                that.correct_answer = group2.name;
            } else if (type === 'less number of shapes') {
                that.text = 'Which group has ' + numOfShapes1 + ' ' + shape + 's?'; // 'this.text' is inherited from parent class
                that.correct_answer = group1.name;
            } else {
                that.text = 'Which group has less ' + shape + 's?'; // 'this.text' is inherited from parent class
                that.correct_answer = group1.name;
            }
        }

        this.addClickListeners();


        // this.shapes.addChild(group1);
        // this.shapes.addChild(group2);

        // creates the instruction for the question
        const question_type = zik(['more', 'more number of shapes', 'less', 'less number of shapes' ]);
        setQuestionAndAnwer(question_type);
    }

    // Function for positioning shapes on the stage
    private positionShapes(shape_array: any[]): zim.Container {

        const row1 = new zim.Container(700, 100);
        const row2 = new zim.Container(700, 100);
        const group = new zim.Container(420, 240);
        group.reg(group.width / 2, group.height / 2);
        const group_background = new Rectangle(420, 240, this.offColor);
        group_background.borderColor = '#fff';
        const shape_type = shape_array[0].type;
        group.center(this.shapes);

        row1.x = 120;
        row1.y = 30;

        row2.x = 120;
        row2.y = 130;

        // this.shapes.drag({currentTarget: true});

        for (let index = 0; index < shape_array.length; index++) {
            const shape = shape_array[index];
            // shape.drag();
            if (index >= 4) {
                row2.addChild(shape);
                shape.x = ((row2.x * index) + 60 - 600);
            } else {
                row1.addChild(shape);
                shape.x = (row1.x * index);
            }

        }

        group.addChild(group_background, row1, row2);
        group.drag({currentTarget: true});
        group.y = 150;
        // group.sca(0.8);
        // row1.x = 20;
        if ( shape_type === 'Triangle') {
            row1.x = 68;
            row2.x = 110;
            row1.y = 2;
            row2.y = 90;
        } else if (shape_type === 'Circle') {
            row1.x = 68;
            row1.y = -5;
            row2.y = 90;
            // row2.x = 60;
        } else if (shape_type === 'Rectangle') {
            row1.x = 25;
            row2.x = 75;
        } else {
            row1.x = 20;
            row2.x = 65;
        }

        row1.sca(0.8), row2.sca(0.8);
        // row1.outline(), row2.outline();
        // zog(group);

        return group;
    }

    private addClickListeners () {
        const group2 = this.group2;
        const group1 = this.group1;
        const that = this;
        this.group1.on('click', function name(e: Event) {
            const rect = this.getChildAt(0);
            rect.color = '#02d611';
            // this.reg(this.width / 2, this.height / 2);
            this.animate({
                obj: {scale: 1.2},
                time: 500,
                // loop: true,
                rewind: true,
                id: 'scale'
                // from:true,
                // sequence:500
            });
            // @ts-ignore
            group2.getChildAt(0).color = '#1A5A77';
            that.user_response = this.name;
            // group2.stopAnimate('scale');
        });

        this.group2.on('click', function name(e: Event) {
            const rect: zim.Rectangle = this.getChildAt(0);
            rect.color = '#02d611';
            // this.reg(this.width / 2, this.height / 2);
            this.animate({
                obj: {scale: 1.2},
                time: 500,
                // loop: true,
                rewind: true,
                id: 'scale'
                // from:true,
                // sequence:500
            });
// @ts-ignore
            group1.getChildAt(0).color = '#1A5A77';
            that.user_response = this.name;

            // group1.stopAnimate('scale');
        });
    }


}
