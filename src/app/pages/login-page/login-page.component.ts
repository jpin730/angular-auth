import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { PATH } from '../../constants/path.constant'
import { ControlErrorsDirective } from '../../directives/control-errors.directive'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ControlErrorsDirective],
  templateUrl: './login-page.component.html',
})
export default class LoginPageComponent {
  private readonly fb = inject(FormBuilder)

  PATH = PATH

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }
  }
}
