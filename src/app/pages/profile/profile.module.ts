import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { NavigationConfig } from 'src/app/models/config';

export const PROFILE_CONFIG: NavigationConfig = {
  data: {
    keymap: 'ctrl+p',
  },
};

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
