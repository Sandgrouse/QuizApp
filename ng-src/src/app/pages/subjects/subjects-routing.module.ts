import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponent } from './subjects.component';
import { ScienceComponent } from './science/science.component';
import { CanvasBoardComponent } from '../../@core/board/canvas-board/canvas-board.component';
import { MathComponent } from './math/math.component';
// import { BoardModule } from '../../@core/board/board.module';
import { LessonComponent } from '../../@core/board/lesson/lesson.component';
import { LanguagesComponent } from '../../@core/board/games/languages/languages.component';



const routes: Routes = [{
    path: '',
    component: SubjectsComponent,
    children: [{
        path: 'science',
        component: ScienceComponent,
      }, {
        path: 'science/solar',
        component: CanvasBoardComponent,
      }, {
        path: 'math',
        component: MathComponent,
      }, {
        path: 'math/counting',
        component: LessonComponent,
      },
      {
        path: 'languages',
        component: LanguagesComponent,
      }
    ],
}];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(routes) ],
    exports: [RouterModule],
    providers: [],
})
export class SubjectsRoutingModule {}
