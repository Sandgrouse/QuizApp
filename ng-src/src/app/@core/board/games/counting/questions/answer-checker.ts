import { Question } from './question';
import { IFeedbackMessage } from '../composition';
import { zim, zik, zop, zog } from '../../../board.component';



export class AnswerChecker {
    correct_messages: IFeedbackMessage[];
    wrong_messages: IFeedbackMessage[];
    feedback_message: IFeedbackMessage;
    status: boolean;

    constructor () {
    }

    confirmAnswer(question: Question, stage: zim.Stage | zim.StageGL) {
        let feedback_message: IFeedbackMessage;

        if (question.correct_answer === question.user_response) {
            this.status = true;
            feedback_message = this.feedBackMessage(this.status);
        } else if (question.user_response === undefined) {
            this.status = undefined;
            feedback_message = this.feedBackMessage(this.status);
        } else {
            this.status = false;
            feedback_message = this.feedBackMessage(this.status);
        }

        return feedback_message;
    }

    private feedBackMessage(status: boolean) {

        const defaultMessage: IFeedbackMessage = {
            header: 'What is your answer to the question?',
            content: `Maybe you made a mistake
                        try again.`,
            status: status
        } ;

        const correctMessages: IFeedbackMessage[] = [

            {   header: 'Great job, Sandra!',
                content: `You answered correctly,
                good job. Keep practicing till you become perfect`,
                status: status
            },
            {   header: 'Genius girl',
                content: `You are doing good,
                 keep this up and you will soon master counting`,
                status: status
            },
            {   header: 'Correct answer!',
                content: `The numbers love you, they are singing your praises`,
                status: status
            },
        ];

        const wrongMessages: IFeedbackMessage[] = [
            {   header: 'No! thats wrong',
                content: `You missed this one,
                don't rush to answer, count carefully.`,
                status: status
            },
            {   header: 'Not correct!',
                content: `Maybe you are going too fast, Count the shapes carefully`,
                status: status
            },
            {   header: 'Wrong answer',
                content: `Change your approach, be sure of your answer before you submit`,
                status: status
            },
        ];

        if (status === true) {
            zog('Brilliant, good counting!');
            this.feedback_message = zik([correctMessages]);

        } else if (status === false) {
            zog('Wrong, are you going too fast?');
            this.feedback_message = zik([wrongMessages]);

        } else {
            this.feedback_message = defaultMessage;
        }

        return this.feedback_message;
    }

    getExplanation() {}

    getCorrection() {}

    sendScore() {}

    diagnosticFeedback() {}
}
