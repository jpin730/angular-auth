import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { LoaderService } from '../../services/loader.service'

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styles: ``,
})
export class LoaderComponent {
  private readonly loaderService = inject(LoaderService)

  loading$ = this.loaderService.loading$
}
