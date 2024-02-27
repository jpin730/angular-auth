import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig } from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { tokenInterceptor } from './interceptors/token.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimations(),
  ],
}
