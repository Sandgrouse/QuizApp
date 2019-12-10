import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LanguagesComponent],
  exports: [LanguagesComponent]
})
export class LanguagesModule { }
