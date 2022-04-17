import { Component, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Stack } from './models/stack';
import { NAVIGATION_STACK } from './navigation-stack.token';
import { PageListType, PAGES_LIST } from './pages.constant';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <button
        *ngFor="let route of routes"
        mat-button
        color="primary"
        [routerLink]="route"
        routerLinkActive="active"
      >
        {{ route | titlecase }}
      </button>
    </nav>

    <router-outlet></router-outlet>

    <footer>
      <button mat-fab (click)="goBack()">Back</button>
    </footer>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'router-history-stack';
  routes: string[];
  keyMap = new Map();
  goBack() {
    let current = this.navStack.pop();
    let prev = this.navStack.peek();
    if (prev) {
      this.navStack.pop();

      this.router.navigateByUrl(prev.urlAfterRedirects);
    } else {
      current && this.navStack.push(current);
    }
  }
  constructor(
    @Inject(NAVIGATION_STACK) private navStack: Stack<NavigationEnd>,
    @Inject(PAGES_LIST) pagesList: PageListType,
    private router: Router
  ) {
    this.routes = pagesList;
    this.router.config.forEach((routerConf) => {
      const keyMap = routerConf.data ? routerConf.data['keymap'] : undefined;
      if (keyMap && !this.keyMap.has(keyMap)) {
        this.keyMap.set(keyMap, `/${routerConf.path}`);
      }
    });
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.navStack.push(val);
        console.log(this.navStack.peek());
      }
    });
  }
}
