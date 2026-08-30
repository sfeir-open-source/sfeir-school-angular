import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { fireEvent, render, screen } from '@testing-library/angular';
import { UserService } from '../../core/provider/user-service';
import { Login } from './login';

const STUB_USER_SERVICE = {
  login: vi.fn(),
} satisfies Partial<UserService>;

async function setup() {
  TestBed.resetTestingModule();
  vi.clearAllMocks();
  const { fixture } = await render(Login, {
    providers: [provideRouter([]), { provide: UserService, useValue: STUB_USER_SERVICE }],
  });
  const navigateSpy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
  return { fixture, component: fixture.componentInstance, navigateSpy };
}

describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  let component: Login;
  let navigateSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    ({ fixture, component, navigateSpy } = await setup());
  });

  describe('Instance', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of Login', () => {
      expect(component).toBeInstanceOf(Login);
    });
  });

  describe('Template', () => {
    it('should disable the login button when the username is empty', async () => {
      await fixture.whenStable();
      expect(screen.getByTestId('login-button')).toBeDisabled();
    });
    it('should enable the login button once a username is entered', async () => {
      fireEvent.input(screen.getByTestId('username-input'), { target: { value: 'john.doe' } });
      await fixture.whenStable();
      expect(screen.getByTestId('login-button')).not.toBeDisabled();
    });
    it('should call UserService.login and navigate to /people when the form is submitted', async () => {
      fireEvent.input(screen.getByTestId('username-input'), { target: { value: 'john.doe' } });
      await fixture.whenStable();
      fireEvent.click(screen.getByTestId('login-button'));
      await fixture.whenStable();
      expect(STUB_USER_SERVICE.login).toHaveBeenCalledExactlyOnceWith('john.doe');
      expect(navigateSpy).toHaveBeenCalledExactlyOnceWith(['/people']);
    });
    it('should not call UserService.login when the username is empty', async () => {
      fireEvent.click(screen.getByTestId('login-button'));
      await fixture.whenStable();
      expect(STUB_USER_SERVICE.login).not.toHaveBeenCalled();
      expect(navigateSpy).not.toHaveBeenCalled();
    });
  });
});
