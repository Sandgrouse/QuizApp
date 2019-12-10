

namespace Knowing {
    export interface IGame extends Phaser.Game {
        level: number;
        stages: any;
    }
    export interface IScene {
        name: string;
    }
}
