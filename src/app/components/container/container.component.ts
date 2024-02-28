import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { fadeAnimation } from '../../animations/fade.animation'
import { LoaderComponent } from '../loader/loader.component'
import { NotificationComponent } from '../notification/notification.component'

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, NotificationComponent],
  templateUrl: './container.component.html',
  animations: [fadeAnimation()],
})
export class ContainerComponent {}
