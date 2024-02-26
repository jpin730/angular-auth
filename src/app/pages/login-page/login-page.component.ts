import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { PATH } from '../../constants/path.constant'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-page.component.html',
})
export default class LoginPageComponent {
  PATH = PATH
}
