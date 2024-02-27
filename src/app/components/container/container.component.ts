import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LoaderComponent } from '../loader/loader.component'

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './container.component.html',
})
export class ContainerComponent {}
