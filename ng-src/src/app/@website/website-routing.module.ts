import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingComponent } from './website-routing/website-routing.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // {path: 'get-started', component: GetStartedComponent},
      // {path: 'contact-us', component: DashboardComponent},
      // {path: 'about', component: ExamComponent},
      // {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ],
  },
  {path: 'get-started', component: GetStartedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule { }
