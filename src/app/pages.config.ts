import { NavigationConfig } from './models/config';
import { PAGES } from './pages.constant';
import { ABOUT_CONFIG } from './pages/about/about.module';
import { DASHBOARD_CONFIG } from './pages/dashboard/dashboard.module';
import { HOME_CONFIG } from './pages/home/home.module';
import { PROFILE_CONFIG } from './pages/profile/profile.module';

export const pageConfig: Record<typeof PAGES[number], NavigationConfig> = {
  home: HOME_CONFIG,
  dashboard: DASHBOARD_CONFIG,
  profile: PROFILE_CONFIG,
  about: ABOUT_CONFIG,
};
