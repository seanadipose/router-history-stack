import { InjectionToken } from '@angular/core';

export const PAGES = ['dashboard', 'profile', 'about', 'home'];

export const PAGES_LIST = new InjectionToken('Pages List', {
  providedIn: 'root',
  factory: () => PAGES,
});

export type PageListType = typeof PAGES;
