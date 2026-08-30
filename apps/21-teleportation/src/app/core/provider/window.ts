import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window & typeof globalThis>('WINDOW', {
  providedIn: 'root',
  factory: () => window,
});
