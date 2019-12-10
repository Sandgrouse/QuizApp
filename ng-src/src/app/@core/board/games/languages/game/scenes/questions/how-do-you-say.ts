import { ILanguageQuestion } from './IQuestions';
import { Play } from '../Play';
import { IContainerLite } from '../../../../lib/types/containeLite';
import { IButtonPlugin, IRexButton } from '../../../../lib/types/button';
import { CreateDashedTexture } from '../../../../lib';
import { ILine } from '../../../../lib/types/line';
import { createButton } from './helpers';
import { IButtons} from '../../../../lib/types/ui.buttons';
import { ILabel } from '../../../../lib/types/label';
import { zik } from '../../../../../board.component';
import { WriteInEnglish } from './write-in-english';
import { ChooseATranslation } from './choose-a-translation';

export class HowDoYouSay implements ILanguageQuestion {
    container: IContainerLite;
    instruction: Phaser.GameObjects.Text;
    actionButtons: (Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle | Phaser.GameObjects.Text)[];
    lines: ILine[];
    optionButtons: IButtons;

    constructor(scene: Play) {
        this.addAllObjects(scene);


        scene.questionContainer.add(this.instruction);
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

    private createOptionButtons(scene: Play) {
        const self = this;
        const width = 250;
        const height = 40;
        const corner = 20;
        const left = 90;
        const top = 0;
        const right = 0;
        const bottom = 0;
        const buttonArray = [
            createButton(scene, 'Goodbye', width, height, corner),
            createButton(scene, 'have', width, height, corner),
            createButton(scene, 'a', width, height, corner),
            createButton(scene, 'good', width, height, corner),
        ];


        const optionButtons = scene.rexUI.add.buttons({
            x: -180,
            y: 15,

            orientation: 'y',
            space: 10,
            name: 'Choices',
            align: 'center',

            buttons: buttonArray,

        }).setOrigin(0, 0.5);

        optionButtons.forEachButtton(function (button: ILabel, index) {
            const textObject = button.getElement('text');
            textObject.setPadding(left, top, right, bottom);
            console.log(textObject);

        });

        optionButtons.layout();


        optionButtons.on('button.click', function (button, index: number) {
            console.log(`Clicked on ${button.text}`);

        });

        return optionButtons;

    }

    private addInstruction(scene: Play) {
        const testWord = '"hello"';
        this.instruction = scene.make.text({
            x: -50,
            y: -150,
            text: 'How do you say ' + testWord + '?',
            style: {
                font: '36px monospace',
                fill: '#000000',
            }
        });
        this.instruction.setOrigin(0.5, 0.5);

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

    submitAnswer(scene: Play) {
        scene.isAnswerCorrect = zik([true, false]);
        console.log(this.optionButtons);
        scene.createDialog();
        scene.setDialog();
        if (scene.isAnswerCorrect) {
            scene.progressBar.increaseCount();
        }


       this.optionButtons.forEachButtton(function (aButton) {
            aButton.disableInteractive();
        });

    }

    removeAllObjects(scene: Play) {
        scene.questionContainer.clear(true);

       scene.questionContainer.visible = true;
       scene.question = new ChooseATranslation(scene);
    }
}
