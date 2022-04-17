import { NgModule } from '@angular/core';
import { Data, Route, RouterModule, Routes } from '@angular/router';
import { PAGES } from './pages.constant';

interface NavigationConfig {
  data?: Data;
}

const pageConfig: Record<typeof PAGES[number], NavigationConfig> = {
  home: {
    data: { keymap: 'ctrl+h' },
  },
  dashboard: { data: { keymap: 'ctrl+d' } },
  profile: { data: { keymap: 'ctrl+p' } },
  about: { data: { keymap: 'ctrl+p' } },
};

function routeFactory<T extends string>(
  routes: T[],
  config: Record<T[number], NavigationConfig>
): Route[] {
  const makeRoute = (route: Array<T>[number]) => {
    const module = route.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
    return {
      path: route,
      loadChildren: () =>
        import(`./pages/${route}/${route}.module`).then(
          (m) => m[`${module}Module`]
        ),
      data: config[route]?.data,
    };
  };
  return routes.map((route) => makeRoute(route));
}
const generatedRoutes = routeFactory(PAGES, pageConfig);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: {},
  },
  ...generatedRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
