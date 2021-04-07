import { trigger, transition, animate, style } from '@angular/animations';

//   transition ( ':enter', [ ... ] ); alias for void => *
//   transition ( ':leave', [ ... ] ); alias for * => void

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition('void => *', [
    style({ opacity: 0, color: 'black',  transform: 'translateY(-100px)' }),
    animate('1s', style({ opacity: 1, color: 'red', transform: 'translateY(100px)'})),
  ]),
  transition('* => void', [animate(1000, style({ opacity: 0, color: 'black', transform: 'translateX(-1000px)' }))]),
]);
