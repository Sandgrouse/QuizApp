import { HowManyQuestion } from './questions/pick.question';
import { ShapeFactory } from './shape.Factory';
import { Question } from './questions/question';
import { PickGroupQuestion } from './questions/group.question';
import { DragShapeQuestion } from './questions/drag.question';



export class QuestionFactory {
    shapeFactory: ShapeFactory;
    question: Question;

    constructor (private frame: zim.Frame) {
        this.shapeFactory = new ShapeFactory(this.frame);
    }

    createAQuestion(questionType: string, stage: zim.Stage | zim.StageGL) {

        switch (questionType) {
            case 'pick answer':
                this.question = new HowManyQuestion(this.shapeFactory);
                break;
            case 'drag answer':
                this.question = new DragShapeQuestion(this.shapeFactory, stage);
                break;
            case 'pick group':
                this.question = new PickGroupQuestion(this.shapeFactory);
                break;
            default:
                this.question = new HowManyQuestion(this.shapeFactory);
                break;
        }

        return this.question;
    }
}
