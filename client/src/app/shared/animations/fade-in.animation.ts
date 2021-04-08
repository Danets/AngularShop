import { trigger, transition, animate, style } from '@angular/animations';

//   transition ( ':enter', [ ... ] ); alias for void => *
//   transition ( ':leave', [ ... ] ); alias for * => void

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({transform: 'scale(0) translateX(-1000px)' }),
    animate('1s ease-in', style({transform: 'scale(1.2) translateX(0)'}))
  ]),
  transition(':leave', [animate('1s ease-out', style({transform: 'scale(0) translateX(-1000px)' }))]),
]);
