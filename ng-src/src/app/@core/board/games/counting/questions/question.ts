import { IQuestion } from '../composition';
import { AnswerChecker } from './answer-checker';
import { zim } from '../../../board.component';

const aCheck = new AnswerChecker();

export abstract class Question implements IQuestion {

    text: string;
    label: zim.Label;
    type: string;
    shapes: zim.Container;
    numOfShapes: number;
    correct_answer: number | string;
    user_response: number  | string;
    score: number;
    bonus_points: number;
    time: number;
    answerPicker: zim.Stepper;
    // answer_checker: AnswerChecker;

    constructor() {
        // this.answer_checker = new AnswerChecker();
    }

    ask(stage: zim.Stage) {

        const instruction = this.text;
        this.label = new zim.Label({
            text: instruction,
            size: 40,
            font: 'helvetica',
            color: 'white',
            rollColor: 'yellow',
            fontOptions: ' bold'
        }).pos(90, 20);

        stage.addChild(this.label, this.shapes);
        this.shapes.outline();
        stage.update();
        // zog(this.text, this.numOfShapes);

    }

    show() {}

    answer(stage: zim.Stage) {

        // const type = this.type;
        if (this.type === 'Count total') {
            this.user_response = this.answerPicker.currentValue;
        }

        // aCheck.confirmAnswer(this.correct_answer, this.user_response, stage);
        stage.removeChild(this.label, this.shapes);
        // zog('Correct answer: ' + this.correct_answer);
        // zog('User response: ' + this.user_response);
    }

    explain() {}

    review() {}

}
