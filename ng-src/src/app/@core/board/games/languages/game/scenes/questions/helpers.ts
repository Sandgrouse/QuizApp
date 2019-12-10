import { SceneBase } from '../scene.base';
import { Play } from '../Play';

const COLOR_PRIMARY = 0x0d18b6;
const Random = Phaser.Math.Between;


function makeIcon (type: string, scene: Play) {
    let icon;

    switch (type) {
        case 'image':
            icon = scene.rexUI.add.roundRectangle(0, 0, 100, 100, 10, 0xFFFF);
            break;
        case 'circle':
            icon = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0xFFFF);
            break;
        default:
            icon = undefined;
            break;
    }

    return icon;
}

export function createButton (scene: Play, text: string, width?: number, height?: number,
    cornerRadius?: number, icon?: string, orientation?: number, top?: number ) {
    let textWidth: number, textHeight: number, textObj: Phaser.GameObjects.Text, corner,
    button;

    if (width && height) {
        textWidth = width;
        textHeight = height;
    } else {
        textObj = scene.add.text(0, 0, text, {});
        textWidth = textObj.getBounds().width;
        textHeight = textObj.getBounds().height;
    }

    if (cornerRadius) {
        corner = cornerRadius;
    } else {
        corner = 10;
    }

    if (icon) {
        button = scene.rexUI.add.label({
            width: textWidth + 12,
            height: textHeight + 10,
            orientation: 0 || orientation,
            background: scene.rexUI.add.roundRectangle(0, 0, textWidth, textHeight, corner, COLOR_PRIMARY),
            icon:  makeIcon(icon, scene),
            text: scene.add.text(0, 0, text, {
                fontSize: 18,
                align: 'center'
            }),
            space: {
                icon: 30,
                left: 10,
                right: 10,
                top: top || 1,
            }
        });
    } else {
        button = scene.rexUI.add.label({
            width: textWidth + 12,
            height: textHeight + 10,
            orientation: 0,
            background: scene.rexUI.add.roundRectangle(0, 0, textWidth, textHeight, corner, COLOR_PRIMARY),
            text: scene.add.text(0, 0, text, {
                fontSize: 18,
                align: 'right',
            }),
            space: {
                left: 10,
                right: 10,
                // text: 500,
                // icon: 50
            },

        });
    }



    if (textObj) {
        textObj.destroy();
    }

    return button;
}

export function getItems (count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            id: i,
            color: Random(0, 0xffffff)
        });
    }
    return data;
}
