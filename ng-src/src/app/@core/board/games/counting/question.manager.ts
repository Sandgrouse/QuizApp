import { QuestionFactory } from './question.factory';
import { Question } from './questions/question';
// import { Examiner } from './counting.service';



export class QuestionManager {
    questionFactory: QuestionFactory;
    questions: Question[];
    question: Question;

    constructor (private frame: zim.Frame) {
        this.questions = [];
        this.questionFactory = new QuestionFactory(this.frame);
    }


    generateQuestion(type: string, stage: zim.Stage) {
        const newQuestion = this.questionFactory.createAQuestion(type, stage);
        this.questions.push(newQuestion);
        this.questionChanged(stage, newQuestion);
    }

    registerFrame(frame: zim.Frame) {}

    removeFrame(frame: zim.Frame) {
    }

    updateStage() {
    }

    questionChanged(stage: zim.Stage, question: Question) {
        question.ask(stage);
        this.question = question;

        // this.frame.stage.removeAllChildren();
        // this.updateStage();
    }

}
