import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PromoBlockComponent } from './components/promo-block/promo-block.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { NbLayoutModule, NbTabsetModule, NbCardComponent, NbCardModule, NbButtonComponent, NbButtonModule } from '@nebular/theme';
import { FeaturesComponent } from './components/features/features.component';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { ChooseACourseComponent } from './components/choose-a-course/choose-a-course.component';

const COMPONENTS = [HomeComponent, HeaderComponent, FooterComponent,
  PromoBlockComponent, FeaturesComponent, DownloadsComponent,
  GetStartedComponent, ChooseACourseComponent
];

@NgModule({
  imports: [
    WebsiteRoutingModule,
    NbLayoutModule, NbButtonModule,
    NbTabsetModule, NbCardModule
  ],
  declarations: [...COMPONENTS]
})
export class WebsiteModule { }
