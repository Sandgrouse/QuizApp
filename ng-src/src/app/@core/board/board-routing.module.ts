import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CanvasBoardComponent } from './canvas-board/canvas-board.component';
import { BoardComponent } from './board.component';
import { LessonComponent } from './lesson/lesson.component';

const topics = [
  {
    path: 'solar',
    component: CanvasBoardComponent,
  },

  {
    path: 'counting',
    component: LessonComponent,
  }
];

const routes: Routes = [{
    path: '',
    component: BoardComponent,
    children: topics,
}];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoardRoutingModule {
    constructor() {console.log('Board Routing works'); }
}
