import { Component, Input, OnChanges } from '@angular/core'
import { ValidationErrors } from '@angular/forms'

@Component({
  selector: 'app-control-errors',
  standalone: true,
  imports: [],
  templateUrl: './control-errors.component.html',
  styles: ``,
})
export class ControlErrorsComponent implements OnChanges {
  @Input({ required: true }) errors: ValidationErrors | null = null
  @Input({ required: true }) touched!: boolean

  errorMessage = ''

  ngOnChanges(): void {
    if (this.touched) {
      this.errorMessage = this.parseErrors(this.errors)
    }
  }

  private parseErrors(errors: ValidationErrors | null): string {
    if (errors === null) {
      return ''
    }

    const error = Object.keys(errors).at(0)

    switch (error) {
      case 'required':
        return 'Field is required'

      case 'email':
        return 'Invalid email'

      case 'minlength':
        return `Minimum length is ${errors[error].requiredLength}`

      default:
        return ''
    }
  }
}
