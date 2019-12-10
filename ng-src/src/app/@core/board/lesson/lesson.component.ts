import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CountingService } from '../games/counting/counting.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { IFeedbackMessage } from '../games/counting/composition';


@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LessonComponent implements OnInit {

  scaling: string; // makes stage the window size but does not scale content
  zns = true;

  constructor(private countingService: CountingService, private modalService: NgbModal) {
    this.scaling = 'full';
  }

  ngOnInit() {
    this.run(this.scaling);
  }

  private run(scaling) {
    return this.countingService.start(scaling, this);
    // return this.languagesService.play();
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
