import { NgModule } from '@angular/core';
import { NbMenuModule, NbTabsetModule } from '@nebular/theme';


import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExamComponent } from './exam/exam.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';

const PAGES_COMPONENTS = [
  PagesComponent,
  ExamComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    NbMenuModule,
    NbTabsetModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
