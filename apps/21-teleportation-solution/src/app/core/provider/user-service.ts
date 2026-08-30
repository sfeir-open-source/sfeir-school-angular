import { inject, Service } from '@angular/core';
import { WINDOW } from './window';

@Service()
export class UserService {
  private readonly _window = inject(WINDOW);

  login(username: string): void {
    this._window.sessionStorage.setItem('Authorization', username);
  }
}
