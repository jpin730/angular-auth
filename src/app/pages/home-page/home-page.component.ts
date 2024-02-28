import { Component } from '@angular/core'
import { HeaderComponent } from '../../components/header/header.component'
import { UserListComponent } from '../../components/user-list/user-list.component'

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, UserListComponent],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {}
