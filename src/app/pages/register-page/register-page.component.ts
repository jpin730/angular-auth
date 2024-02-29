import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { ControlErrorsComponent } from '../../components/control-errors/control-errors.component'
import { PATH } from '../../constants/path.constant'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ControlErrorsComponent],
  templateUrl: './register-page.component.html',
})
export default class RegisterPageComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)

  PATH = PATH

  registerForm = this.fb.nonNullable.group({
    email: ['user@email.com', [Validators.required, Validators.email]],
    name: ['Jane Smith', [Validators.required]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      return
    }

    const { email, name, password } = this.registerForm.getRawValue()

    this.authService.register(email, name, password).subscribe()
  }
}
