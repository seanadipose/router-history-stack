import { Component, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Stack } from './models/stack';
import { NAVIGATION_STACK } from './navigation-stack.token';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'router-history-stack';
  constructor(
    @Inject(NAVIGATION_STACK) private navStack: Stack<NavigationEnd>,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.navStack.push(val);
        console.log(this.navStack.peek());
      }
    });
  }
}
