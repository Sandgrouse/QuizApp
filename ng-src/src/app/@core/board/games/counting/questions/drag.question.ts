
// Import all required counting classes and helper functions
import { Question } from './question';
import { ShapeFactory } from '../shape.Factory';
import { positionUniqueShapes, positionInARow } from '../composition'; // helper functions
import { zim, zik, zop, zog } from '../../../board.component';


export class DragShapeQuestion extends Question {
    group_background: zim.Rectangle; // the answer rectangle where the shapes are dropped into
    shapeTypes: string[]; // Diffrent shape types selected randomly
    shapeFactory: ShapeFactory; // Shape factory class creates shape objects
    answer_drop_point: zim.Container; // Container that houses the answer rectangle and shapes
    stage: zim.Stage | zim.StageGL;

    constructor (sF: ShapeFactory, stage: zim.Stage | zim.StageGL) {
        super();
        this.type = 'drag answer';
        this.shapeTypes = ['circle', 'rectangle', 'triangle', 'bee', 'pot', 'crab', 'tea cup'];
        this.shapeFactory = sF;
        this.shapes = new zim.Container(900, 500); // Inherited from question class
        this.shapes.x = 70;
        this.shapes.y = 70;
        this.stage = stage; // Stage object passed in as a parameter
        this.createQuestion();
    }

    createQuestion() {
        const shape_type: string = zik(this.shapeTypes); // randomly select a shape
        this.numOfShapes = zim.rand(1, 10); // the number of shapes in the question's instruction
        this.correct_answer = this.numOfShapes;

        // Create the group background and set its properties
        this.group_background = new Rectangle(500, 400, '#1A5A77').alp(0).animate({obj: {alpha: 1 }, time: 700});
        this.group_background.name = 'Answer rectangle';
        this.group_background.borderColor = '#fff';

        // Make one shape which will be dragged and copied
        const base_shape = this.shapeFactory.makeShapes(1, shape_type);
        const shape: zim.Shape = base_shape[0]; // collect the shape object from the array above

        const shape_positioned = this.positionShapes(shape); // the shape is poistioned and all drag and drop functions are added here
        this.answer_drop_point = this.createDropPoint(); // creates the answer box

        this.shapes.addChild(this.answer_drop_point, shape_positioned, shape); // add all to stage

        // create the question's instruction
        if (this.numOfShapes === 1) {
            // "this.text" is inherited from question parent class
            this.text = 'Drag and drop ' + this.numOfShapes + ' ' + shape_type + ' into the box?';
        } else {
            this.text = 'Drag and drop ' + this.numOfShapes + ' ' + shape_type + 's into the box?';
        }

    }

    private positionShapes(shape: zim.Shape): zim.Container {

        const stage = this.stage;
        const that = this;
        // create a container that houses all cloned shapes and set its properties
        const shape_container = new zim.Container(stage.width, stage.height);
        shape_container.name = 'Shapes container';

        // save the answer rectangle as a local variable and create rows for positioning the clones
        const answer_box = this.group_background;
        const row1 = new zim.Container(460, 100);
        const row2 = new zim.Container(460, 100);
        const row3 = new zim.Container(460, 100);

        const clone_array: zim.Shape[] = []; // array for collecting cloned shapes

        let current; // Parent shape to be cloned
        let shape_clone: zim.Shape; // clone of parent shape
        let shape_count = 0; // total number of clones in the answer box

        row1.x = row2.x = row3.x = 18; // set rows' horizontal positions

        // set rows' vertical positions
        row1.y = 25;
        row2.y = 150;
        row3.y = 275;

        // When a clone is dropped in the answer box this function positions it
        function placeInAnswerBox (s_clone: zim.Shape, e?: Event) {

            if (s_clone.hitTestBounds(answer_box)) {

                shape_count++;
                that.user_response = shape_count;

                zog(shape_count);
                switch (shape_count) {
                    case 1:
                        positionInARow(s_clone, row1, 50, 7);
                        break;
                    case 2:
                        positionInARow(s_clone, row1, 163, 120);
                        break;
                    case 3:
                        positionInARow(s_clone, row1, 276, 233);
                        break;
                    case 4:
                        positionInARow(s_clone, row1, 389, 346);
                        break;
                    case 5:
                        positionInARow(s_clone, row2, 50, 7);
                        break;
                    case 6:
                        positionInARow(s_clone, row2, 163, 120);
                        break;
                    case 7:
                        positionInARow(s_clone, row2, 276, 233);
                        break;
                    case 8:
                        positionInARow(s_clone, row2, 389, 346);
                        break;
                    case 9:
                        positionInARow(s_clone, row3, 50, 7);
                        break;
                    case 10:
                        positionInARow(s_clone, row3, 163, 120);
                        break;
                    case 11:
                        positionInARow(s_clone, row3, 276, 233);
                        break;
                    case 12:
                        positionInARow(s_clone, row3, 389, 346);
                        break;
                    default:

                        break;
                }
            }

            zop(e || window.event);


            stage.update();
        }

        // Makes sure that all clones can be added to the answer box at all times in their exsistence
        function addCloneListeners (c_array: zim.Shape[]) {
            for (let index = 0; index < c_array.length; index++) {
                const element = c_array[index];

                element.on('pressup', function(e: Event) {
                    current = e.currentTarget;

                    placeInAnswerBox(element);

                    // zog(e);
                    zop(e || window.event);
                    stage.update();
                });
            }
        }

        shape.drag();

        // 3. on mousedown copy and set copy to drag
        shape.on('mousedown', function(e: Event) {
            current = e.target;

            shape_clone = current.clone().addTo(shape_container).drag();
            // 4. put the copy under the object we are dragging
            shape_container.setChildIndex(current, shape_container.numChildren - 1);
            // @ts-ignore
            current.startX = copy.x = current.x;
            // @ts-ignore
            current.startY = copy.y = current.y;

            stage.update();
        }, false);

        // 5. on a pressup, swap the two objects
        shape.on('pressup', function(e: Event) {
            current = e.currentTarget;
            // swap positions

            swapProperties('x', current, shape_clone);
            swapProperties('y', current, shape_clone);
            clone_array.push(shape_clone);

            placeInAnswerBox(shape_clone, e);

            addCloneListeners(clone_array);

            stage.update();
        });

        answer_box.addChild(row1, row2, row3);
        row1.outline(), row2.outline(), row3.outline();

        // positionUniqueShapes(shape, 60, 60, 65, 65, 25, 30, 30, 20);


        return shape_container;
    }

    private createDropPoint (): zim.Container {
        // create a container for answer rectangle and set its properties
        const group = new zim.Container(500, 400);
        group.name = 'answer container';

        group.addChild(this.group_background);

        // Set horizontal and vertical positions of the container
        group.x = 350;
        group.y = 20;

        return group;
    }


}
