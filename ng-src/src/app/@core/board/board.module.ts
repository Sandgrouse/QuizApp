
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ThreeDeeComponent } from './three-dee/three-dee.component';
import { CanvasBoardComponent } from './canvas-board/canvas-board.component';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
// import { SolarSystemService } from './stories/solar-system/solar-system.service';
import { CountingService } from './games/counting/counting.service';
import { ModalComponent } from './modal/modal.component';
import { Languages } from './games/languages/game/game.service';



@NgModule({
  imports: [
    CommonModule, BoardRoutingModule
  ],
  declarations: [BoardComponent, CanvasBoardComponent],
  providers: [
    CountingService, Languages
  ],
})
export class BoardModule {
  constructor() {console.log('Board Module works'); }
 }
