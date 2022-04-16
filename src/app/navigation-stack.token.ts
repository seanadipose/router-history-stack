import { InjectionToken } from '@angular/core';
import { Stack } from './models/stack';

export const NAVIGATION_STACK = new InjectionToken('Navigation Stack', {
  providedIn: 'root',
  factory: () => new Stack(),
});
