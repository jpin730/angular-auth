import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { ControlErrorsComponent } from '../../components/control-errors/control-errors.component'
import { PATH } from '../../constants/path.constant'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ControlErrorsComponent],
  templateUrl: './login-page.component.html',
})
export default class LoginPageComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  PATH = PATH

  loginForm = this.fb.nonNullable.group({
    email: ['admin@email.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
  })

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }

    const { email, password } = this.loginForm.getRawValue()

    this.authService
      .login(email, password)
      .subscribe(() => this.router.navigate([`/${PATH.HOME}`]))
  }
}
