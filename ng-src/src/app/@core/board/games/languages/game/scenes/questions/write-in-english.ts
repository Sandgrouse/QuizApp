import { GameApp } from '../../app';
import { IButtonPlugin, IRexButton, IRexButtonConfig } from '../../../../lib/types/button';
import { Play } from '../Play';
import { CreateDashedTexture, ButtonSetInteractive } from '../../../../lib';
import { ILine } from '../../../../lib/types/line';
import { IButtons } from '../../../../lib/types/ui.buttons';
import { ILanguageQuestion } from './IQuestions';
import { zik } from '../../../../../board.component';
import { IButton } from 'selenium-webdriver';
import { createButton } from './helpers';
import { WhatDoYouHear } from './what-do-you-hear';

const Rectangle = Phaser.GameObjects.Rectangle;
const Random = Phaser.Math.Between;
const Spread = Phaser.Actions.Spread;
const GridAlign = Phaser.Actions.GridAlign;
const Clone = Phaser.Utils.Objects.Clone;
const COLOR_PRIMARY = 0x0d18b6;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


export class WriteInEnglish implements ILanguageQuestion {

    public name = 'WriteInEnglish';
    instruction: Phaser.GameObjects.Text;
    soundButton: Phaser.GameObjects.Sprite;
    testSentence: Phaser.GameObjects.Text;
    actionButtons: any[];
    lines: any[];
    optionButtons: IButtons;
    answerbuttons: IButtons;
    container: any;


    constructor (scene: Play) {
        this.addAllObjects(scene);

        // console.log(scene.rexUI.add.buttons);
        // sound
        // this.answerbuttons.visible = true;
        // this.optionButtons.visible = true;
        // this.answerbuttons.layout();


        scene.questionContainer.add(this.instruction);
        scene.questionContainer.add(this.soundButton);
        scene.questionContainer.add(this.testSentence);
        scene.questionContainer.add(this.actionButtons);
        scene.questionContainer.add(this.lines);
        scene.questionContainer.add(this.optionButtons);
        scene.questionContainer.add(this.answerbuttons);

        this.container = scene.questionContainer;
        // this.optionButtons.visible = true;

        console.log(this.container, 'Options state ', this.optionButtons.visible);

    }

    private addAllObjects(scene: Play) {

        this.addInstruction(scene);


        this.actionButtons = this.addActionButtons(scene);
        this.lines = this.addlines(scene);

        this.addWordButtons(scene);

        // this.optionButtons.list[0].setInteractive();
        // console.log(this.optionButtons.list);


    }

    private addInstruction(scene: Play) {
        this.instruction = scene.make.text({
            x: -50,
            y: -150,
            text: 'Write this in English',
            style: {
                font: '36px monospace',
                fill: '#000000',
            }
        });
        this.instruction.setOrigin(0.5, 0.5);
        const soundIconFrame = GameApp.settings.soundOn ? 'IconSoundOn' : 'IconSoundOff';
        this.soundButton = scene.add.sprite(-225, -80, 'Sprites', soundIconFrame);
        this.soundButton.setOrigin(0.5, 0.5);
        this.soundButton.setInteractive();
        this.soundButton.on('pointerdown', function (this: WriteInEnglish) {
            GameApp.settings.soundOn = !GameApp.settings.soundOn;
            this.soundButton.setFrame(GameApp.settings.soundOn ? 'IconSoundOn' : 'IconSoundOff');
        }, this);
        this.testSentence = scene.make.text({
            x: -70,
            y: -80,
            text: 'What is your name',
            style: {
                font: '22px monospace',
                fill: '#ffffff'
            }
        });
        this.testSentence.setOrigin(0.5, 0.5);
    }

    private addActionButtons (scene: Play) {

        const self = this;

        // CHECK button properties
        const checkX = 250;
        const checkY = 230;
        const checkName = 'CHECK';

        // SKIP button properties
        const skipX = -250;
        const skipY = 230;
        const skipName = 'SKIP';

        // Rex Button Plugin
        const rexButton = <IButtonPlugin>scene.plugins.get('rexButton');


        const btn = scene.add.rectangle(skipX, skipY, 100, 50, 0x333333)
            .setName(name);
        const btn2 = scene.add.sprite(checkX, checkY, 'Sprites', 'IconPlay').setName(checkName);

        const btnText = scene.add.text(checkX, checkY, checkName, {
            fontSize: '20pt',
            fill: '#000000',
        }).setOrigin(0.5, 0.5);

        const btn2Text = scene.add.text(skipX, skipY, skipName, {
            fontSize: '20pt',
            fill: '#ffffff',
        }).setOrigin(0.5, 0.5);


        const checkButton = rexButton.add(btn2, {
            // clickInterval: 1000  // ms
        });
        checkButton.on('click', function (button: IRexButton) {
            self.submitAnswer(scene);
        });

        const skipButton = rexButton.add(btn, {
            // clickInterval: 1000  // ms
        });
        skipButton.on('click', function (button: IRexButton) {
            self.removeAllObjects(scene);
        });
        return [btn2, btn, btnText, btn2Text];
    }

    private submitAnswer(scene: Play) {
        scene.isAnswerCorrect = zik([true, false]);
        console.log(scene.isAnswerCorrect);
        scene.createDialog();
        scene.setDialog();
        if (scene.isAnswerCorrect) {
            scene.progressBar.increaseCount();
        }
        // console.log(self.answerbuttons);
        this.answerbuttons.forEachButtton(function (aButton) {
            aButton.disableInteractive();
        });
        this.optionButtons.forEachButtton(function (aButton) {
            aButton.disableInteractive();
        });
    }

    private addlines (scene: Play) {
        CreateDashedTexture(scene, 'dashed', 1, 0.4, 0x54629c);
        CreateDashedTexture(scene, 'dashed2', 1, 0.4, 0xF0F3FF);

        const line = <ILine>scene.add.rexLine({
            start: {
                x: -350, y: 200,
            },
            end: {
                x: 350, y: 200
            },

            body: {
                key: 'dashed',
                width: 10,
            }
        });

        const line2 = <ILine>scene.add.rexLine({
            start: {
                x: -250, y: 40,
            },
            end: {
                x: 300, y: 40
            },

            body: {
                key: 'dashed2',
                width: 8,
            }
        });


        return [line, line2];
    }

    private addWordButtons(scene: Play) {
        const self = this;
        const buttonArray = [
            createButton(scene, 'Goodbye'),
            createButton(scene, 'have'),
            createButton(scene, 'a'),
            createButton(scene, 'good'),
            createButton(scene, 'day'),
        ];


        this.optionButtons = scene.rexUI.add.buttons({
            x: -250,
            y: 55,

            orientation: 'x',
            space: 7,
            name: 'Choices',

            buttons: buttonArray,

        }).setOrigin(0, 0.5);

        /* this.optionButtons.forEachButtton(function (button: IButton, index: number, buttons) {
            self.optionButtons.showButton(index);
            // button.setInteractive();
            self.optionButtons.layout();

            console.log(index, buttons);
        }); */

        this.optionButtons.layout();

        this.answerbuttons = scene.rexUI.add.buttons({
            x: -250,
            y: 0,

            orientation: 'x',
            space: 5,
            align: 'left',
            name: 'Answers',


            buttons: []

        }).setOrigin(0, 0.5);
        this.answerbuttons.layout();

        this.optionButtons.on('button.click', function (button, index: number) {
            console.log(`Clicked on `, button);
            // const mybutton = Clone(buttonArray[index]);
            const mybutton =  createButton(scene, `${button.text}`);
            self.answerbuttons.addButton(mybutton, 0, 'left', 3);

            const background = button.getElement('background');
            background.fillColor  = 0xffffff;

            // ButtonSetInteractive.call(answerbuttons, mybutton);
            // answerbuttons.eventEmitter.childrenMap.buttons.push(mybutton);
            console.log('Buttons: ', self.answerbuttons.childrenMap.buttons);
            console.log('Sizer children: ', self.answerbuttons.sizerChildren);
            // scene.update(Date.now(), 10000);

            // const bottons = answerbuttons.getElement('buttons');
            // console.log(bottons);
            // answerButtonArray.push(mybutton);
            // answerbuttons.layout();
            button.disableInteractive();
           // console.log('Clone: ', mybutton, 'Original: ', buttonArray[index]);
        });

        this.answerbuttons.on('button.click', function (button, index: number) {
            // const gameObject = buttons.getElement('#' + `${button.text}`);
            self.answerbuttons.removeButton(button);
            const mirrorButton = self.optionButtons.childrenMap.buttons.filter(t => t.text === button.text);
            const background = mirrorButton[0].getElement('background');

            mirrorButton[0].setInteractive();
            background.fillColor  = COLOR_PRIMARY;


            console.log('Buttons: ', self.answerbuttons.childrenMap.buttons);
            console.log('Sizer children: ', self.answerbuttons.sizerChildren);
        });


    }

    removeAllObjects(scene?: Play) {
        // this.container.removeAll(true);
        // scene.questionContainer.removeAll(true);
        scene.questionContainer.clear(true);
       //  this.container.clear();
       // this.container.destroy();
       // scene.questionContainer.destroy();
       // console.log(this.container, scene.questionContainer);

       // scene.questionContainer = scene.add.rexContainerLite(0, 0);
       // scene.questionContainer = scene.add.container(0, 0);
       scene.questionContainer.visible = true;
       scene.question = new WhatDoYouHear(scene);
       // scene.questionContainer.list[9].visible = true;
       // console.log( scene.questionContainer.list[9]);

       // scene.question = undefined;
    }

}


