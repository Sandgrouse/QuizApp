import { SceneBase } from './scene.base';
import { api } from '../../../sponsors/sponsor';
import { is } from '../../../sponsors/utils';
import { eSponsorID } from '../../../sponsors/list';
import { EdgiSponsor } from '../../../sponsors/brands/edgi.sponsor';
import { ProgressBar } from '../../../phaser-objects/';
import { WriteInEnglish } from './questions/write-in-english';
import { UIPlugin } from '../../../lib';
import { IUIPlugin } from '../../../lib/types/ui.plugin';
import { zik } from '../../../../board.component';
import { IContainerLite } from '../../../lib/types/containeLite';
import { WhatDoYouHear } from './questions/what-do-you-hear';
import { HowDoYouSay } from './questions/how-do-you-say';
import { ChooseATranslation } from './questions/choose-a-translation';
import { WhichOfTheseIs } from './questions/which-of-these-is';

const GetValue = Phaser.Utils.Objects.GetValue;

const data = {
    title: 'Question 1',
    content: '1 + 1 + 1 + 1 = ',
    choices: [3, 4, 5],
};

const createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        width: 40, // Minimum width of round-rectangle
        height: 40, // Minimum height of round-rectangle

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),

        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
};

const createLabel2 = function (scene, text, backgroundColor?) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, backgroundColor),

        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
};


const createDialog = function (scene, x, y, onClick) {
    const dialog = scene.rexUI.add.dialog({
        x: x,
        y: y,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xf57f17),

        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xbc5100),
            text: scene.add.text(0, 0, 'Pick a color', {
                fontSize: '20px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        actions: [
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xe91e63),
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x673ab7),
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x2196f3),
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x00bcd4),
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x4caf50),
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xcddc39),
        ],

        space: {
            title: 10,
            action: 5,

            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
        },
        expand: {
            // title: false,
            // content: false,
            // description: false,
            // choices: false,
            actions: true,
        },
    })
        .layout()
        .pushIntoBounds()
        // .drawBounds(this.add.graphics(), 0xff0000)
        .popUp(500);

    dialog
        .on('button.click', function (button, groupName, index) {
            onClick(button.fillColor);
        })
        .on('button.over', function (button, groupName, index) {
            button.setStrokeStyle(2, 0xffffff);
        })
        .on('button.out', function (button, groupName, index) {
            button.setStrokeStyle();
        });

    return dialog;
};

const createDialog2 = function (scene) {
    return scene.rexUI.add.dialog({
        x: -50,
        y: -50,
        width: 360,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
            text: scene.add.text(0, 0, ' ', {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        content: scene.add.text(0, 0, ' ', {
            fontSize: '24px'
        }),

        choices: [
            createLabel2(scene, ' ', 0x6a4f4b),
            createLabel2(scene, ' ', 0x6a4f4b),
            createLabel2(scene, ' ', 0x6a4f4b),
            createLabel2(scene, ' ', 0x6a4f4b),
            createLabel2(scene, ' ', 0x6a4f4b)
        ], // Support 5 choices

        actions: [
            createLabel2(scene, 'Submit', 0x1b0000),
        ],

        space: {
            title: 25,
            content: 25,
            choices: 20,
            choice: 15,
            action: 15,

            left: 25,
            right: 25,
            top: 25,
            bottom: 25,
        },

        expand: {
            content: false,  // Content is a pure text object
        }
    });
};


const setDialog = function (dialog, config) {
    // Set title
    dialog.getElement('title').text = GetValue(config, 'title', ' ');
    // Set content
    dialog.getElement('content').text = GetValue(config, 'content', ' ');
    // Set choices
    const choiceTextArray = GetValue(config, 'choices', []);
    let choiceText;
    const choices = dialog.getElement('choices');
    for (let i = 0, cnt = choices.length; i < cnt; i++) {
        choiceText = choiceTextArray[i];
        if (choiceText != null) {
            dialog.showChoice(i);
            choices[i].text = choiceText;
        } else {
            dialog.hideChoice(i);
        }
    }
    return dialog;
};


export class Play extends SceneBase implements Knowing.IScene {

    public static Name = 'Play';
    public name: string = Play.Name;
    progressBar: ProgressBar;
    progressBox: Phaser.GameObjects.Graphics;
    progressCount = 0;
    questionContainer: IContainerLite;
    question: WriteInEnglish | WhatDoYouHear | HowDoYouSay | ChooseATranslation | WhichOfTheseIs;
    rexUI: IUIPlugin;
    print: any;
    dialogModal: any;
    isAnswerCorrect: boolean;
    dialog = undefined;

    // --------------------------------------------------------------------
    public create(): void {
        console.log('Play');
        const self = this;


        // bacground color
        this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0xB8C6FF);
        this.progressBar = new ProgressBar(self, {x: -300, y: -260}, 500, 30, 15);
        // this.questionContainer = this.add.container(0, 0);
        this.questionContainer = this.add.rexContainerLite(0, 0);

        // this.question = new WriteInEnglish(self);
        // this.question = new WhatDoYouHear(self);
        // this.question = new HowDoYouSay(self);
        // this.question = new ChooseATranslation(self);
        this.question = new WhichOfTheseIs(self);
        // this.dialog = this.createDialog();
        // this.dialogModal = this.exampleYesOrNoDialog();
        // this.dialogModal = this.exampleSingleChoiceDialog();
        // this.dialogModal = this.exampleShowHideButton();
        // this.dialogModal = this.exampleDialog();


        console.log(this.questionContainer);



        // focus on 0, 0
        this.setView();

        // back icon
        this.addControls();

        // add some animation
        // this.buildScene();

    }
    createDialog(): any {
        const self = this;
        let backgroundColour: number;
        let buttonColour: number;
        let titleBackgroundColour: number;
        let titleText: string;

        if (this.isAnswerCorrect) {
            backgroundColour = 0x5fff8c;
            titleBackgroundColour = 0x50d575;
            buttonColour = 0x01a52f;
            titleText = 'You got it!';
        } else {
            backgroundColour = 0xff5960;
            titleBackgroundColour = 0xfc4a4a;
            buttonColour = 0xbb0505;
            titleText = 'Wrong translation';

        }

        const width = this.gameWidth;
        const height = this.gameHeight;
        this.dialog = this.rexUI.add.dialog({
            x: 0,
            y: height / 2.8,
            width: width,

            background: this.add.rectangle(0, 0, width, 50, backgroundColour),

            title: this.rexUI.add.label({
                background: this.add.rectangle(0, 0, 100, 40, titleBackgroundColour),
                text: this.add.text(0, 0, titleText, {
                    fontSize: '24px'
                }),
                space: {
                    left: 25,
                    right: 15,
                    top: 10,
                    bottom: 10
                }
            }),

            content: this.add.text(0, 0, 'Do you want to build a snow man?', {
                fontSize: '24px'
            }),

            actions: [
                createLabel2(this, 'Continue', buttonColour),
            ],

            space: {
                title: 25,
                content: 25,
                action: 15,
                actionsRight: 50,

                left: 0,
                right: 0,
                top: 0,
                bottom: 20,
            },

            align: {
                actions: 'right', // 'center'|'left'|'right'
            },

            expand: {
                content: false,  // Content is a pure text object
            }
        }).layout().on('button.click', function (button, groupName, index) {
                this.question.removeAllObjects(this);
                // this.dialog.scaleDownDestroy(100);


                // this.question = undefined;

                // this.dialog.scaleDownDestroy(500);
                // this.dialog = undefined;
        }, this).on('button.over', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle(2, 0xffffff);
        }).on('button.out', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle();
        });

        this.questionContainer.add(this.dialog);
    }

    private examplePopUpDialog() {
        this.print = this.add.text(0, 0, 'Click to pop-up dialog');

        const scene = this;
        let dialog;
        this.input.on('pointerdown', function (pointer) {
            const x = pointer.x,
                y = pointer.y;

                console.log(x, y);


            if (dialog === undefined) {
                dialog = createDialog(scene, x, y, function (color) {
                    scene.rexUI.add.roundRectangle(x, y, 0, 0, 20, color);
                    scene.print.text = 'Add object at (' + x + ',' + y + ')';
                    dialog.scaleDownDestroy(100);
                    dialog = undefined;
                });
                scene.print.text = 'Click (' + x + ',' + y + ')';
            } else if (!dialog.isInTouching(pointer)) {
                dialog.scaleDownDestroy(100);
                dialog = undefined;
            }
        }, this);
    }

    private exampleDialog() {
        const  dialog = this.rexUI.add.dialog({
            x: 400,
            y: 300,
            width: 500,

            background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

            title: createLabel(this, 'Title').setDraggable(),

            toolbar: [
                createLabel(this, 'O'),
                createLabel(this, 'X')
            ],

            content: createLabel(this, 'Content'),

            description: createLabel(this, 'Description'),

            choices: [
                createLabel(this, 'Choice0'),
                createLabel(this, 'Choice1'),
                createLabel(this, 'Choice2')
            ],

            actions: [
                createLabel(this, 'Action0'),
                createLabel(this, 'Action1')
            ],

            space: {
                left: 20,
                right: 20,
                top: -20,
                bottom: -20,

                title: 25,
                // titleLeft: 30,
                content: 25,
                description: 25,
                // descriptionLeft: 20,
                // descriptionRight: 20,
                choices: 25,

                // toolbarItem: 5,
                choice: 15,
                action: 15,
            },

            expand: {
                title: false,
                // content: false,
                // description: false,
                // choices: false,
                // actions: false,
            },

            align: {
                // title: 'center',
                // content: 'right',
                // description: 'left',
                // choices: 'left',
                actions: 'left', // 'center'|'left'|'right'
            },

            click: {
                mode: 'release'
            }
        })
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000);

        this.print = this.add.text(0, -200, 'Hhey yoo');
        dialog
            .on('button.click', function (button, groupName, index) {
                this.print.text += groupName + '-' + index + ': ' + button.text + '\n';
            }, this)
            .on('button.over', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle(2, 0xffffff);
            })
            .on('button.out', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle();
            });
    }

    private exampleShowHideButton() {
        this.print = this.add.text(0, 0, '');

        const dialog = createDialog2(this)
            .layout()
            .on('button.click', function (button, groupName, index) {
                this.print.text += index + ': ' + button.text + '\n';
            }, this)
            .on('button.over', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle();
            });

        this.input.once('pointerdown', function () {
            setDialog(dialog, data).layout();
        });

        this.add.text(0, 580, 'Click to reset buttons');
    }

    private exampleSingleChoiceDialog() {
        const dialog = this.rexUI.add.dialog({
            x: 0,
            y: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

            title: this.rexUI.add.label({
                background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
                text: this.add.text(0, 0, 'Question 10', {
                    fontSize: '24px'
                }),
                space: {
                    left: 15,
                    right: 15,
                    top: 10,
                    bottom: 10
                }
            }),

            content: this.add.text(0, 0, '1 + 1 + 1 + 1 + 1 = ', {
                fontSize: '24px'
            }),

            choices: [
                createLabel2(this, '3'),
                createLabel2(this, '4'),
                createLabel2(this, '5'),
                createLabel2(this, '6')
            ],

            space: {
                title: 25,
                content: 25,
                choice: 15,

                left: 25,
                right: 25,
                top: 25,
                bottom: 25,
            },

            expand: {
                content: false,  // Content is a pure text object
            }
        })
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000);

        this.print = this.add.text(0, 0, '');
        dialog
            .on('button.click', function (button, groupName, index) {
                this.print.text += index + ': ' + button.text + '\n';
            }, this)
            .on('button.over', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle();
            });
    }

    private exampleYesOrNoDialog() {
        const dialog = this.rexUI.add.dialog({
            x: 0,
            y: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

            title: this.rexUI.add.label({
                background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f),
                text: this.add.text(0, 0, 'Title', {
                    fontSize: '24px'
                }),
                space: {
                    left: 15,
                    right: 15,
                    top: 10,
                    bottom: 10
                }
            }),

            content: this.add.text(0, 0, 'Do you want to build a snow man?', {
                fontSize: '24px'
            }),

            actions: [
                createLabel2(this, 'Yes'),
                createLabel2(this, 'No')
            ],

            space: {
                title: 25,
                content: 25,
                action: 15,

                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },

            align: {
                actions: 'right', // 'center'|'left'|'right'
            },

            expand: {
                content: false,  // Content is a pure text object
            }
        })
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000);

        this.print = this.add.text(0, 0, '');
        dialog
            .on('button.click', function (button, groupName, index) {
                this.print.text += index + ': ' + button.text + '\n';
            }, this)
            .on('button.over', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle();
            });
    }

    // --------------------------------------------------------------------
    private addControls(): void {
        const y = -this.gameHeight / 2 + 50;
        const x = -this.gameWidth / 2 + 50;

        // menu icon
        const menu = this.add.sprite(x, y, 'Sprites', 'IconMenu');
        menu.setInteractive();
        menu.on('pointerdown', function (this: Play) {
            this.backToMenu();
        }, this);
    }


    // --------------------------------------------------------------------
    private buildScene(): void {

        // create pig animation if it does not exist
        if (typeof this.anims.get('pig') === 'undefined') {
            this.anims.create({
                key: 'pig',
                frames: this.anims.generateFrameNames('Sprites', {
                    frames: ['pig01', 'pig02', 'pig03', 'pig04', 'pig05', 'pig06', 'pig07'] }),
                frameRate: 3,
                repeat: -1
            });
        }

        // add pig sprite and play animation
        const pig = this.add.sprite(0, 0, 'Sprites');
        pig.anims.play('pig');
    }

    // --------------------------------------------------------------------
    private Button(): void {
        // play
        const play = this.add.sprite(0, 200, 'Sprites', 'IconPlay');
        play.setInteractive();
        play.on('pointerdown', function (this: Play) {
            // this.scene.start('WriteInEnglish');
            this.progressBar.increaseCount();

        }, this);
    }

    // --------------------------------------------------------------------
    private backToMenu(): void {
        const self = this;

        // report end of game
        api.endGameSession({ score: 12345, level: 10 })
        .then(function () {
            self.scene.start('Menu');
        });

        // some very special SBCGames function
        if (is(eSponsorID.EDGI)) {
            (<EdgiSponsor>api).someVerySpecificSponsorFunction();
        }
    }


    private getContainerSize(con: Phaser.GameObjects.Container) {
        // set the top position to the bottom of the game
        let top = this.gameHeight;
        let bottom = 0;
        // set the left to the right of the game
        let left = this.gameWidth;
        let right = 0;
        //
        //
        // loop through the children
        //
        con.iterate(function(child) {
            // get the positions of the child
            const childX = child.x;
            const childY = child.y;
            //
            //
            //
            const childW = child.displayWidth;
            const childH = child.displayHeight;
            //
            //
            // calcuate the child position
            // based on the origin
            //
            //
            const childTop = childY - (childH * child.originY);
            const childBottom = childY + (childH * (1 - child.originY));
            const childLeft = childX - (childW * child.originX);
            const childRight = childX + (childW * (1 - child.originY));
            // test the positions against
            // top, bottom, left and right
            //
            if (childBottom > bottom) {
                bottom = childBottom;
            }
            if (childTop < top) {
                top = childTop;
            }
            if (childLeft < left) {
                left = childLeft;
            }
            if (childRight > right) {
                right = childRight;
            }
        }.bind(this));
        //
        // calculate the square
        const h = Math.abs(top - bottom);
        const w = Math.abs(right - left);
        // set the container size
        con.setSize(w, h);
    }

    setDialog () {

        let backgroundColour: number;
        let buttonColour: number;
        let titleBackgroundColour: number;
        let titleText: string;

        if (this.isAnswerCorrect) {
            backgroundColour = 0x5fff8c;
            titleBackgroundColour = 0x50d575;
            buttonColour = 0x01a52f;
            titleText = 'You got it!';
        } else {
            backgroundColour = 0xff5960;
            titleBackgroundColour = 0xfc4a4a;
            buttonColour = 0xbb0505;
            titleText = 'Wrong translation';

        }
        // Set title
        this.dialog.getElement('title').text = titleText;

        // Set title background colour
        this.dialog.getElement('title').backgroundChildren[0].fillColor = titleBackgroundColour;

        // Set title button colour
        this.dialog.getElement('actions')[0].backgroundChildren[0].fillColor = buttonColour;

        // Set dialog background color
        this.dialog.getElement('background').fillColor = backgroundColour;

        // return scene.dialog;
    }
}
