import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
// import {Zim} from '../../../../lib/zim_alpha';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
  ],
  providers : [
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
