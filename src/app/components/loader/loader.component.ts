import { Component, inject } from '@angular/core'
import { fadeAnimation } from '../../animations/fade.animation'
import { LoaderService } from '../../services/loader.service'
import { SpinnerSvgComponent } from '../../svgs/spinner-svg/spinner-svg.component'

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [SpinnerSvgComponent],
  templateUrl: './loader.component.html',
  animations: [fadeAnimation()],
})
export class LoaderComponent {
  private readonly loader = inject(LoaderService)

  loading = this.loader.loading
}
