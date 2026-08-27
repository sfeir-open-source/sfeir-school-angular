import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UserService } from '../../core/provider/user-service';

@Component({
  selector: 'sfeir-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormField, FormRoot],
})
export class Login {
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);
  private readonly _model = signal<string>('');
  protected readonly _loginForm = form<string>(
    this._model,
    path => {
      required(path, { message: 'Username is required' });
    },
    {
      submission: {
        action: async field => {
          this._userService.login(field().value());
          await this._router.navigate(['/people']);
        },
      },
    },
  );
}
