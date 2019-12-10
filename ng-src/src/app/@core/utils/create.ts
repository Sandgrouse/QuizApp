import { IRexButtonConfig, IButtonPlugin } from '../board/games/lib/types/button';


const GetValue = Phaser.Utils.Objects.GetValue;




export class Create {

    name: 'create';

    public static button (scene: Phaser.Scene, config: IRexButtonConfig) {
        const x: number = GetValue(config, 'x', 0);
        const y: number = GetValue(config, 'y', 0);
        const color: number = GetValue(config, 'color', 0xffffff);
        const name: string = GetValue(config, 'name', '');

        const rexButton = <IButtonPlugin>scene.plugins.get('rexButton');

        /* const btn = scene.add.ellipse(x, y, 120, 120, color)
            .setName(name); */
        const btn2 = scene.add.sprite(0, 0, 'Sprites', 'IconPlay').setName(name);

        /* const roundBtn = scene.add.graphics();
        roundBtn.fillStyle(color, 1);
        roundBtn.fillRoundedRect(x, y, 120, 120, 15); */

        scene.add.text(x, y, name, {
            fontSize: '20pt'
        })
            .setOrigin(0.5, 0.5);
        const zeButton = rexButton.add(btn2, {
            // clickInterval: 1000  // ms
        });
        zeButton.on('click', function (button) {
            scene.print.text += 'click ' + button.gameObject.name + '\n';
        });
        return btn2;
    }
}
