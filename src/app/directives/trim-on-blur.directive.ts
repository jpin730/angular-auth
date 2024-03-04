import { Directive, HostListener, inject } from '@angular/core'
import { FormControlDirective, FormControlName } from '@angular/forms'

@Directive({
  selector: 'input[appTrimOnBlur]',
  standalone: true,
})
export class TrimOnBlurDirective {
  private readonly formControlDirective = inject(FormControlDirective, {
    optional: true,
  })
  private formControlName = inject(FormControlName, { optional: true })

  @HostListener('blur')
  onBlur(): void {
    const control =
      this.formControlDirective?.control ?? this.formControlName?.control

    if (!control || control.value === null) {
      return
    }

    control.patchValue(control.value.trim())
  }
}
