import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-knowing-popover',
  templateUrl: './knowing-popover.component.html',
  styleUrls: ['./knowing-popover.component.css']
})
export class KnowingPopoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    const content = document.getElementById('space-questions');
    if (content.style.maxHeight) {
      // content.style.display = 'none';
      content.style.maxHeight = null;
    } else {
      // content.style.display = 'block';
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }

}
