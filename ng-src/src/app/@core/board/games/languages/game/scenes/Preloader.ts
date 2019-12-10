import { SceneBase } from './scene.base';
import { StorageUtils } from '../../../../../utils';
import { Config } from '../data';
import { GameApp } from '../app';

export class Preloader extends SceneBase implements Knowing.IScene {

    public static Name = 'Preloader';

    public name: string = Preloader.Name;

    // -------------------------------------------------------------------------
    public create(): void {
        console.log('Preloader');

        this.scene.start('Menu');

        const self = this;

        // load user settings
        StorageUtils.load(Config.SAVE_KEY)
            .then(function (data: any) {
                // if data is not null and not undefined
                if (data != null) {
                    GameApp.settings = data;
                    console.log('Settings loaded...');
                } else {
                    console.log('No saved settings.');
                }

                // continue to menu
                self.scene.start('Menu');
        });
    }

    // --------------------------------------------------------------------
    public preload(): void {

        console.log('Loading assets...');

        // load atlas with test sprites
        this.load.atlas('Sprites', 'assets/sprites/Sprites.png', 'assets/sprites/Sprites.json');
        this.load.atlas('progress-bar');
    }
}
