import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { fadeAnimation } from '../../animations/fade.animation'
import { LoaderService } from '../../services/loader.service'

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  animations: [fadeAnimation()],
})
export class LoaderComponent {
  private readonly loaderService = inject(LoaderService)

  loading$ = this.loaderService.loading$
}
