import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  status = false;

  constructor() { }

  ngOnInit() {
  }

  // Handle Overlay
  handleOverlay() {
    console.log('overlayed');

    this.status = !this.status;
  }

}
