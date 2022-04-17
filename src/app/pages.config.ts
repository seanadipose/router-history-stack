import { NavigationConfig } from './models/config';
import { PAGES } from './pages.constant';

export const pageConfig: Record<typeof PAGES[number], NavigationConfig> = {
  home: {
    data: { keymap: 'ctrl+h' },
  },
  dashboard: { data: { keymap: 'ctrl+d' } },
  profile: { data: { keymap: 'ctrl+p' } },
  about: { data: { keymap: 'ctrl+a' } },
};
