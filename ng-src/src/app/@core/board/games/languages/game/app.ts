import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { Menu } from './scenes/Menu';
import { Config } from './data';
import { StorageUtils } from '../../../../utils/';
import { Settings } from './data/Settings';
import { eSponsorID } from '../../sponsors/list';
import { Play } from './scenes/Play';
import { ButtonPlugin, LinePlugin, GridAlignPlugin, RhombusPlugin, GridTablePlugin, UIPlugin, ContainerLitePlugin } from '../../lib';

export namespace GameApp {
    // sponsor
    // @ts-ignore
    export const sponsor: eSponsorID = eSponsorID.EDGI;

    // Helper objects for specific sponsors
    // export const facebook: eSponsorID = eSponsorID.FACEBOOK;
    // export const edgi: eSponsorID = eSponsorID.EDGI;

    // Game settinds
    export let settings = new Settings();
}

export class LanguagesGame extends Phaser.Game {


    // --------------------------------------------------------------------
    constructor() {

        // default renderer
        const renderer: number = Phaser.AUTO;

        // init game
        super(
            {
                type: renderer,

                parent: 'parent_game',

                width: Config.GAME_WIDTH,
                height: Config.GAME_HEIGHT,

                title: 'Nigerian Language Game',
                plugins: {
                    global: [
                        {
                            key: 'rexButton',
                            plugin: ButtonPlugin,
                            start: true
                        },

                        {
                            key: 'rexContainerLitePlugin',
                            plugin: ContainerLitePlugin,
                            start: true
                        },

                        {
                            key: 'rexLine',
                            plugin: LinePlugin,
                            start: true
                        },

                        {
                            key: 'rexGridAlign',
                            plugin: GridAlignPlugin,
                            start: true
                        },

                        {
                            key: 'rexRhombus',
                            plugin: RhombusPlugin,
                            start: true
                        },

                        {
                            key: 'rexGridTable',
                            plugin: GridTablePlugin,
                            start: true
                        }
                    ],
                    scene: [{
                        key: 'rexUI',
                        plugin: UIPlugin,
                        mapping: 'rexUI'
                    }]
                }
            }
        );


        // states
        this.scene.add('Boot', Boot);
        this.scene.add('Preloader', Preloader);
        this.scene.add('Menu', Menu);
        this.scene.add('Play', Play);

        // start
        this.scene.start('Boot');
    }
}
