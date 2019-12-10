import { Component, OnInit } from '@angular/core';
// import 'createjs';
// import {zog} from '../../lib/zim_alpha';
// import {zim, zog} from '../../lib/zim-new.js';
// import {zim} from '../../lib/zim-zap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor() {}

  ngOnInit() {
    // zog('hello Zimmers!');
    // zet('#help').css('color', 'goldenrod'); // would make the text of all paragraphs goldenrod
  }
}
