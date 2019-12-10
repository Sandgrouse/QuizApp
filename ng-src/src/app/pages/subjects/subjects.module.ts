import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { SubjectsRoutingModule } from './subjects-routing.module';
// import { SolarSystemService } from '../../@core/board/stories/solar-system/solar-system.service';
// import { BoardModule } from '../../@core/board/board.module';


import { SubjectsComponent } from './subjects.component';
import { ScienceComponent } from './science/science.component';
import { CanvasBoardComponent } from '../../@core/board/canvas-board/canvas-board.component';
import { MathComponent } from './math/math.component';
import { CountingService } from '../../@core/board/games/counting/counting.service';
import { ModalComponent } from '../../@core/board/modal/modal.component';
import { LessonComponent } from '../../@core/board/lesson/lesson.component';
import { NbTabsetModule, NbCardModule } from '@nebular/theme';
import { LanguagesModule } from '../../@core/board/games/languages/languages.module';
import { LanguagesComponent } from '../../@core/board/games/languages/languages.component';



const components = [
    SubjectsComponent,
    ScienceComponent,
    CanvasBoardComponent,
    MathComponent,
    ModalComponent,
    LessonComponent,
];

@NgModule({
    declarations: [...components],
    imports: [ ThemeModule, SubjectsRoutingModule, NbTabsetModule, NbCardModule, LanguagesModule ],
    exports: [],
    providers: [ CountingService],
    entryComponents: [
        ModalComponent,
      ],
})
export class SubjectsModule {}
