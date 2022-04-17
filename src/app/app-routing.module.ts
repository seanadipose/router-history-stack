import { NgModule } from '@angular/core';
import { Data, Route, RouterModule, Routes } from '@angular/router';
import { NavigationConfig } from './models/config';
import { pageConfig } from './pages.config';
import { PAGES } from './pages.constant';

function routeFactory<T extends string>(
  routes: T[],
  config?: Record<T[number], NavigationConfig>
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
    };
  };
  return routes
    .map((route) => makeRoute(route))
    .map((routeConfig) =>
      Object.assign(routeConfig, config ? config[routeConfig.path] : {})
    );
}
const generatedRoutes = routeFactory(PAGES, pageConfig);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  ...generatedRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
