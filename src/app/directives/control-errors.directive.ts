import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core'
import { ValidationErrors } from '@angular/forms'

@Directive({
  selector: '[appControlErrors]',
  standalone: true,
})
export class ControlErrorsDirective implements OnChanges {
  private readonly elementRef = inject(ElementRef<HTMLInputElement>)

  @Input({ alias: 'appControlErrors', required: true })
  errors: ValidationErrors | null = null
  @Input({ required: true }) touched!: boolean

  get element(): HTMLInputElement {
    return this.elementRef.nativeElement
  }

  ngOnChanges(): void {
    if (this.touched) {
      this.element.textContent = this.parseErrors(this.errors)
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
