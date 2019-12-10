import { SceneBase } from './scene.base';

export class Boot extends SceneBase implements Knowing.IScene {

    public static Name = 'Boot';

    public name: string = Boot.Name;

    // --------------------------------------------------------------------
    public create(): void {
        console.log('Boot');

        this.scene.start('Preloader');
    }
}
