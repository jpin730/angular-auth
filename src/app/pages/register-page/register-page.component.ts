import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { PATH } from '../../constants/path.constant'
import { ControlErrorsDirective } from '../../directives/control-errors.directive'

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ControlErrorsDirective],
  templateUrl: './register-page.component.html',
})
export default class RegisterPageComponent {
  private readonly fb = inject(FormBuilder)

  PATH = PATH

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      return
    }
  }
}
