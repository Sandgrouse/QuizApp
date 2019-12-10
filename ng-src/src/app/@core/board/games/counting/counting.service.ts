import { Injectable } from '@angular/core';
import { QuestionFactory } from './question.factory';
import { QuestionManager } from './question.manager';
import { Question } from './questions/question';
import { AnswerChecker } from './questions/answer-checker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CanvasBoardComponent } from '../../canvas-board/canvas-board.component';

import * as moment from 'moment';
import { LessonComponent } from '../../lesson/lesson.component';
import { zim, zog, zik } from '../../board.component';

const now = moment().format('LLLL');
const seconds = moment.duration(25, 'seconds');


// zog(now, seconds);




@Injectable()
export class CountingService {
     factory: QuestionFactory;
     manager: QuestionManager;
     questionTypes: string[];
     frame: zim.Frame;
     answer_checker: AnswerChecker;
     board: LessonComponent;

    constructor() {
      this.questionTypes = ['pick group', 'pick answer', 'drag answer'];
      // this.questionTypes = ['drag answer', 'drag answer'];
      this.frame = new zim.Frame('counting-lesson');
      this.frame.loadAssets(['ice_cream_cone.png', 'bee.png', 'tea_cup.png', 'crab.png', 'pot.png'], 'assets/images/');
      this.answer_checker = new AnswerChecker();
      // console.log(this.frame.asset('pot.png'));


    }

    private getQuestion (stage: zim.Stage) {
        const questionType = zik(this.questionTypes);
        this.manager = new QuestionManager(this.frame);
        this.manager.generateQuestion(questionType, stage);
        // return question;
    }

    start(scaling: string, boardComponent: any) {
        // const question: Question = this.getQuestion();
        let stage: zim.Stage;
        // const frame = new zim.Frame(scaling);
        const that = this;
        // const frame = this.frame;
        this.board = boardComponent;


        this.frame.on('ready', function() {
          zog('ready from ZIM Frame');

          // const canvas = document.getElementById('knowing-boardCanvas');
          stage = this.stage;
          let stageW = this.height;
          let stageH = this.height;
          this.color = '#4065FF';

          // simple form for a vertical guide
          // use the distance from the guide to your cursor to measure
          // so you only need one vertical guide for horizontal measurement
          /* const guide = new Guide();

          // better to add guides to a GuideManager
          const manager = new GuideManager();
          manager.add(new Guide(stage));
          manager.add(new Guide(stage, false)); */

          // put your code here
          const waiter = new zim.Waiter(stage);
          // waiter.show();

          this.on('complete', function () {
            that.getQuestion(stage);
            const answerInstruction = new zim.Label({
                text: 'Choose your answer',
                font: 'helvetica',
                rollColor: 'yellow',
                // fontOptions: ' bold'
            });
            const submitButton = new Button(140, 60, 'Submit');

            submitButton.pos(100, 440).addTo(stage); // this adds to stage as well otherwise stage.addChild(button);
            submitButton.on('click', function() { // on() is like addEventListener()
                that.submit(that.manager.question, stage);
                // zog('submitted');
            });



            // waiter.hide();
            waiter.dispose();

          });

          stage.update();

          // put resizing code in here
          // resize also gets called initially
          this.on('resize', resize);
          function resize() {
              zog('resizing');
            stageW = that.frame.width;
            stageH = that.frame.height;
            // can redraw things at different sizes or use scaling here
            that.resize(stage, true, 'both', true, 1);
            // grid.resize();
            stage.update();
          }

          // resize();

        }); // end of ready
    }

    submit(question: Question, stage: zim.Stage) {
        question.answer(stage);
        const that = this;
        const feedback = this.answer_checker.confirmAnswer(question, stage);
        // this.board.showModal(feedback);
        this.getQuestion(stage);
        // stage.addChild(feedback);
        stage.update();
    }

    resize(stage: zim.Stage, isResp: boolean, respDim, isScale, scaleType) {
        const canvas = <HTMLCanvasElement>document.getElementById('counting-lessonCanvas');
        let lastW, lastH, lastS = 1;
        window.addEventListener('resize', resizeCanvas);
        // this.pm.pages.resize();
        function resizeCanvas() {
          const w = stage.width, h = stage.height;
          const iw = window.innerWidth, ih = window.innerHeight;
          const pRatio = window.devicePixelRatio || 1, xRatio = iw / w, yRatio = ih / h;
          let sRatio = 1;
          if (isResp) {
            if ((respDim === 'width' && lastW === iw) || (respDim === 'height' && lastH === ih)) {
              sRatio = lastS;
            } else if (!isScale) {
              if (iw < w || ih < h ) {
                sRatio = Math.min(xRatio, yRatio);
              }
            } else if (scaleType === 1) {
              sRatio = Math.min(xRatio, yRatio);
            } else if (scaleType === 2) {
              sRatio = Math.max(xRatio, yRatio);
            }
          }
          canvas.width = w * pRatio * sRatio;
          canvas.height = h * pRatio * sRatio;
          canvas.style.width  = w * sRatio + 'px';
          canvas.style.height  = h * sRatio + 'px';
          stage.scaleX = pRatio * sRatio;
          stage.scaleY = pRatio * sRatio;
          lastW = iw; lastH = ih; lastS = sRatio;
          stage.tickOnUpdate = false;
          stage.update();
          stage.tickOnUpdate = true;
        }

        resizeCanvas();
    }
}
