import { SceneBase } from './scene.base';
import { zimify, zog } from '../../../../board.component';
import { StorageUtils } from '../../../../../utils';
// import { Config } from '../data/Config';
import { GameApp } from '../app';
import { Config } from '../data';
import { api } from '../../../sponsors/sponsor';

export class Menu extends SceneBase implements Knowing.IScene {

    public static Name = 'Menu';

    public name: string = Menu.Name;

    // -------------------------------------------------------------------------
    public create(): void {
        console.log('Menu');

        // bacground color
        this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x808080);

        // focus on 0, 0
        this.setView();

        /* // red circle
        const graphics = this.add.graphics();
        graphics.fillStyle(0xff0000);
        graphics.fillCircle(0, 0, 50); */

        // sound and music icons
        this.addAudioControls();

        // add play button
        this.addPlayButton();

        // text
        if (Config.SPONSOR_ASSOCIATION.length > 0) {
            this.add.text(-this.gameWidth / 2 + 20, this.gameHeight / 2 - 30, Config.SPONSOR_ASSOCIATION);
        }
    }

    // --------------------------------------------------------------------
    private addAudioControls(): void {
        const y = -this.gameHeight / 2 + 50;

        // sound
        const soundIconFrame = GameApp.settings.soundOn ? 'IconSoundOn' : 'IconSoundOff';
        const sound = this.add.sprite(-40, y, 'Sprites', soundIconFrame);
        sound.setInteractive();
        sound.on('pointerdown', function (this: Menu) {
            GameApp.settings.soundOn = !GameApp.settings.soundOn;
            sound.setFrame(GameApp.settings.soundOn ? 'IconSoundOn' : 'IconSoundOff');
            this.saveSettings();
        }, this);

        // music
        const musicIconFrame = GameApp.settings.musicOn ? 'IconMusicOn' : 'IconMusicOff';
        const music = this.add.sprite(40, y, 'Sprites', musicIconFrame);
        music.setInteractive();
        music.on('pointerdown', function (this: Menu) {
            GameApp.settings.musicOn = !GameApp.settings.musicOn;
            music.setFrame(GameApp.settings.musicOn ? 'IconMusicOn' : 'IconMusicOff');
            this.saveSettings();
        }, this);
    }

    // --------------------------------------------------------------------
    private saveSettings(): void {
        StorageUtils.save(Config.SAVE_KEY, GameApp.settings)
            .then(function () {
                console.log('Settings saved...');
            }).catch(function (e) {
                console.log(e);
            });
    }

    // --------------------------------------------------------------------
    private addPlayButton(): void {
        // play
        const play = this.add.sprite(0, 0, 'Sprites', 'IconPlay');
        play.setInteractive();
        play.on('pointerdown', function (this: Menu) {
            this.startGame();
        }, this);
    }

    // --------------------------------------------------------------------
    private startGame(): void {

        const self = this;

        // report start of game
        api.startGameSession()
        .then(function () {
            self.scene.start('Play');
        });
    }
}

