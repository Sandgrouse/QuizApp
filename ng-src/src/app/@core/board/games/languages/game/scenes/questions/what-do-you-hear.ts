import { ILanguageQuestion } from './IQuestions';
import { Play } from '../Play';
import { GameApp } from '../../app';
import { IButtonPlugin, IRexButton } from '../../../../lib/types/button';
import { IContainerLite } from '../../../../lib/types/containeLite';
import { CreateDashedTexture } from '../../../../lib';
import { ILine } from '../../../../lib/types/line';
import { createButton, getItems } from './helpers';
import { zik } from '../../../../../board.component';
import { IButtons } from '../../../../lib/types/ui.buttons';
import { WriteInEnglish } from './write-in-english';
import { HowDoYouSay } from './how-do-you-say';

const COLOR_PRIMARY = 0x0d18b6;
const COLOR_LIGHT = 0xffffff;
const COLOR_DARK = 0x260e04;
// const COLOR_LIGHT = 0x7b5e57;

export class WhatDoYouHear implements ILanguageQuestion {
    instruction: Phaser.GameObjects.Text;
    soundButton: Phaser.GameObjects.Sprite;
    container: IContainerLite;
    actionButtons: (Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle | Phaser.GameObjects.Text)[];
    lines: ILine[];
    optionButtons: any;
    print: Phaser.GameObjects.Text;
    optionRow2: IButtons;
    optionRow1: IButtons;

    constructor(scene: Play) {
        this.addAllObjects(scene);


        scene.questionContainer.add(this.instruction);
        scene.questionContainer.add(this.soundButton);
        scene.questionContainer.add(this.actionButtons);
        scene.questionContainer.add(this.lines);
        scene.questionContainer.add(this.optionButtons);

        this.container = scene.questionContainer;
    }

    private addAllObjects(scene: Play) {

        this.addInstruction(scene);


        this.actionButtons = this.addActionButtons(scene);
        this.lines = this.addlines(scene);
        this.optionButtons = this.createOptionButtons(scene);


    }

    private addInstruction(scene: Play) {
        this.instruction = scene.make.text({
            x: -50,
            y: -150,
            text: 'What do you hear?',
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
        this.soundButton.on('pointerdown', function (this: WhatDoYouHear) {
            GameApp.settings.soundOn = !GameApp.settings.soundOn;
            this.soundButton.setFrame(GameApp.settings.soundOn ? 'IconSoundOn' : 'IconSoundOff');
        }, this);

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


        return [line];
    }

    private createOptionButtons(scene: Play) {
        const self = this;
        // const icon = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0xFFFF);
        const buttonArray1 = [
            createButton(scene, 'A', 200, 50, 20, 'circle'),
            createButton(scene, 'B', 200, 50, 20, 'circle'),
        ];
        const buttonArray2 = [
            createButton(scene, 'C', 200, 50, 20, 'circle'),
            createButton(scene, 'D', 200, 50, 20, 'circle'),
        ];


        const row1 = scene.rexUI.add.buttons({
            x: -180,
            y: -60,

            orientation: 'x',
            space: 10,
            name: 'Choices',

            buttons: buttonArray1,

        }).setOrigin(0, 0.5);
        const row2 = scene.rexUI.add.buttons({
            x: -180,
            y: 20,

            orientation: 'x',
            space: 10,
            name: 'Choices',

            buttons: buttonArray2,

        }).setOrigin(0, 0.5);


        row1.layout();
        row2.layout();

        row1.on('button.click', function (button, index: number) {
            console.log(`Clicked on ${button.text} `);

            // const background = button.getElement('background');
            // background.fillColor  = 0xffffff;

        });
        row2.on('button.click', function (button, index: number) {
            console.log(`Clicked on ${button.text} `);

            // const background = button.getElement('background');
            // background.fillColor  = 0xffffff;

        });

        this.optionRow1 = row1;
        this.optionRow2 = row2;

        return [row1, row2];

    }

    private submitAnswer(scene: Play) {
        scene.isAnswerCorrect = zik([true, false]);
        console.log(this.optionButtons);
        scene.createDialog();
        scene.setDialog();
        if (scene.isAnswerCorrect) {
            scene.progressBar.increaseCount();
        }


       this.optionRow1.forEachButtton(function (aButton) {
            aButton.disableInteractive();
        });
        this.optionRow2.forEachButtton(function (aButton) {
            aButton.disableInteractive();
        });
    }

    removeAllObjects(scene: Play) {
       scene.questionContainer.clear(true);

       scene.questionContainer.visible = true;
       scene.question = new HowDoYouSay(scene);

    }
}
