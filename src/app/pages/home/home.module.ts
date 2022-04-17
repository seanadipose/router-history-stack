import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavigationConfig } from 'src/app/models/config';

export const HOME_CONFIG: NavigationConfig = { data: { keymap: 'ctrl+h' } };
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
