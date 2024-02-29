import { Component, HostListener } from '@angular/core'
import { fadeAnimation } from '../../animations/fade.animation'

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  animations: [fadeAnimation()],
})
export class DropdownComponent {
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
