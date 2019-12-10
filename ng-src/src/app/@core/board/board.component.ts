import { Component, OnInit } from '@angular/core';
require('@danzen/createjs');
const makeZIM = require('zimjs');
export const zim = makeZIM(); // pass in true to use zim namespace **
export const [zog, zid, zss, zgo, zum, zot, zop, zil, zet, zob, zik, zta, zimify] = zim.getGlobals();

@Component({
    selector: 'app-board',
    template: '<router-outlet></router-outlet>'
})
export class BoardComponent implements OnInit {
    constructor() {
        console.log('Board don work');
    }

    ngOnInit() { console.log('Board don work'); }
}
