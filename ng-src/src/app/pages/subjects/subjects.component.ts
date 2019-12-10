import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
