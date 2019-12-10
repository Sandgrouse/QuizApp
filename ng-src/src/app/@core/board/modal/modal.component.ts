import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CountingService } from '../games/counting/counting.service';

@Component({
    selector: 'app-modal',
  template: `
    <div class="modal-header">
      <h2>{{ modalHeader }}</h2>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ modalContent }}
    </div>
    <div class="modal-footer">
      <div class="feedback_buttons" [ngSwitch]="status">
        <div *ngSwitchCase="true">
          <button class="btn btn-md btn-info" (click)="closeModal()">Review your answer</button>
          <button class="btn btn-md btn-success" (click)="closeModal()" *ngIf='status===true'>Continue</button>
        </div>
        <div *ngSwitchCase="false">
          <button class="btn btn-md btn-warning" (click)="closeModal()">See the answer</button>
          <button class="btn btn-md btn-primary" (click)="closeModal()">Continue</button>
        </div>
        <div *ngSwitchDefault>
          <button class="btn btn-md btn-primary" (click)="closeModal()">Continue</button>
        </div>
      </div>
    </div>
  `,
})
export class ModalComponent implements OnInit {
    modalHeader: string;
    modalContent = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
      nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.`;
    status: boolean;

    constructor(private activeModal: NgbActiveModal) { }

    closeModal() {
      this.activeModal.close();
    }

    ngOnInit(): void { }
}
