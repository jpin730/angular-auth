import {
  AnimationTriggerMetadata,
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { FADE_TIME } from '../constants/fade-time.constant'

export const fadeAnimation = (
  timingIn = FADE_TIME,
  timingOut = FADE_TIME,
): AnimationTriggerMetadata => {
  return trigger('fade', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(timingIn, style({ opacity: 1 })),
    ]),
    transition(':leave', [animate(timingOut, style({ opacity: 0 }))]),
    transition('* <=> *', [
      query(':enter', [style({ display: 'none' })], { optional: true }),
      query(
        ':leave',
        [style({ opacity: 1 }), animate(timingOut, style({ opacity: 0 }))],
        { optional: true },
      ),
      query(':leave', [style({ display: 'none' })], { optional: true }),
      query(':enter', [style({ display: 'initial' })], { optional: true }),
      query(':enter', [style({ opacity: 0 })], { optional: true }),
      query(
        ':enter',
        [style({ opacity: 0 }), animate(timingIn, style({ opacity: 1 }))],
        { optional: true },
      ),
    ]),
  ])
}
