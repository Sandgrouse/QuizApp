import { Injectable } from '@angular/core';
import { Game } from './app';

declare module BoilerPlate {}

@Injectable()
export class Languages {
    play() {
        const game = new Game();
        return game;
    }
}
