import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
// import { SolarSystemService } from '../stories/solar-system/solar-system.service';
import { CountingService } from '../games/counting/counting.service';

// import * as createjs from 'createjs-module';
// import { zimify } from 'zimjs';
// import {createjs} from 'createJs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { IFeedbackMessage } from '../games/counting/composition';


@Component({
  selector: 'app-canvas-board',
  templateUrl: './canvas-board.component.html',
  styleUrls: ['./canvas-board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CanvasBoardComponent implements OnInit {

  scaling: string; // makes stage the window size but does not scale content
  zns = true;

  constructor( private modalService: NgbModal) {
    this.scaling = 'knowing-board';
  }

  ngOnInit() {
    this.run(this.scaling);
  }

  private run(scaling) {
    // return this.solarService.start(scaling);
    // return this.countingService.start(scaling, this);
  }

  showModal(feedback: IFeedbackMessage) {
    const activeModal = this.modalService.open(ModalComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });

    activeModal.componentInstance.status = feedback.status;
    activeModal.componentInstance.modalHeader = feedback.header;
    activeModal.componentInstance.modalContent = feedback.content;

  }

}
