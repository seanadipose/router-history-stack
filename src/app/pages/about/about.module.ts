import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { NavigationConfig } from 'src/app/models/config';

export const ABOUT_CONFIG: NavigationConfig = { data: { keymap: 'ctrl+a' } };

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutModule {}
