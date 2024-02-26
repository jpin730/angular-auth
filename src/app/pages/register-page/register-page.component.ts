import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { PATH } from '../../constants/path.constant'

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register-page.component.html',
})
export default class RegisterPageComponent {
  PATH = PATH
}
