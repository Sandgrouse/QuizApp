import { Component, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import * as $ from 'jquery';

// import {jQuery} from 'jquery';


@Injectable()
export class KnowingLaunch {

  constructor() {
  }

  hello() {
    console.log('Hello friend, What do you Know?');
  }
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {


  constructor() {}

  ngOnInit() {

  }

}
