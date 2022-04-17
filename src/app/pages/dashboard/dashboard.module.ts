import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavigationConfig } from 'src/app/models/config';

export const DASHBOARD_CONFIG: NavigationConfig = {
  data: { keymap: 'ctrl+d' },
};

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
