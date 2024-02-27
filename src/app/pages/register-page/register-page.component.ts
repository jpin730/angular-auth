import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { ControlErrorsComponent } from '../../components/control-errors/control-errors.component'
import { PATH } from '../../constants/path.constant'

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ControlErrorsComponent],
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
