import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { fadeAnimation } from './animations/fade.animation'
import { LoaderComponent } from './components/loader/loader.component'
import { NotificationComponent } from './components/notification/notification.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, NotificationComponent],
  template: `
    <div [@fade]="outlet.activatedRouteData">
      <router-outlet #outlet="outlet" />
    </div>
    <app-loader />
    <app-notification />
  `,
  animations: [fadeAnimation()],
})
export class AppComponent {}
