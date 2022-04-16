import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

const pages = ['dashboard', 'profile', 'about', 'home'];

function routeFactory<T extends string>(routes: T[]): Route[] {
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
  return routes.map((route) => makeRoute(route));
}

const generatedRoutes = routeFactory(pages);

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
