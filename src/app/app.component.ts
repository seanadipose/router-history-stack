import { Component, HostListener, Inject } from '@angular/core';
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

    <section [class]="keypress ? 'bottom-right' : ''">
      {{ keypress }}
    </section>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly keyMap = new Map();
  readonly title = 'router-history-stack';
  readonly routes: string[];

  keypress: string = '';
  timer?: any;

  @HostListener('document:keydown', ['$event'])
  onKeyDown(ev: KeyboardEvent) {
    if (ev.ctrlKey && ev.keyCode !== 17) {
      this.highlightKeypress(`ctrl+${ev.key}`);

      if (this.keyMap.has(`ctrl+${ev.key}`)) {
        const path = this.keyMap.get(`ctrl+${ev.key}`);
        this.router.navigateByUrl(path);
      }
    }
  }

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

  highlightKeypress(keypress: string) {
    // clear existing timer, if any
    if (this.timer) {
      clearTimeout(this.timer);
    }

    // set the user selection
    this.keypress = keypress;

    // reset user selection
    this.timer = setTimeout(() => {
      this.keypress = '';
    }, 500);
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
        console.log(keyMap);

        this.keyMap.set(keyMap, `/${routerConf.path}`);
      }
    });
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.navStack.push(val);
      }
    });
  }
}
