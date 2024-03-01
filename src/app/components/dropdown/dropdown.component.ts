import { Component, HostListener, Input, booleanAttribute } from '@angular/core'
import { fadeAnimation } from '../../animations/fade.animation'

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  animations: [fadeAnimation()],
})
export class DropdownComponent {
  @Input({ transform: booleanAttribute }) centered = false

  private hostClicked = false

  open = false

  @HostListener('click')
  hostClick(): void {
    this.hostClicked = true
  }

  @HostListener('document:click', ['$event'])
  documentClick(): void {
    if (this.open && !this.hostClicked) {
      this.open = false
    }
    this.hostClicked = false
  }
}
