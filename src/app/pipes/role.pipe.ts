import { Pipe, PipeTransform } from '@angular/core'
import { ROLE } from '../constants/role.constant'

@Pipe({
  name: 'role',
  standalone: true,
})
export class RolePipe implements PipeTransform {
  transform(value: ROLE): string {
    switch (value) {
      case ROLE.ADMIN:
        return 'Administrator'
      case ROLE.USER:
        return 'Regular User'
      default:
        return 'Unknown'
    }
  }
}
