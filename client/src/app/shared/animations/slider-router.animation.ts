import {
  trigger,
  transition,
  animate,
  style,
  query,
  group,
  animateChild,
} from '@angular/animations';

const resetRoute = [
  style({ position: 'relative' }),
  query(
    ':enter, :leave',
    [
      style({
        // position: 'fixed', // using absolute makes the scroll get stuck in the previous page's scroll position on the new page
        // top: 0, // adjust this if you have a header so it factors in the height and not cause the router outlet to jump as it animates
        // left: 0,
        // width: '100%',
        // opacity: 0,
        transform: 'translateY(-1000px)'
      }),
    ],
    { optional: true }
  ),
];

export const sliderRouteAnimation = trigger('sliderRouteAnimation', [
  transition('* <=> *', [
    // ...resetRoute,
    query(':enter', [style({opacity: 0, transform: 'translateY(-1000px)'})], {
      optional: true,
    }),
    group([
      query(
        ':leave',
        [animate('0.5s ease-in', style({opacity: 0, transform: 'translateY(-1000px)' })), animateChild()],
        { optional: true }
      ),
      query(
        ':enter',
        [animate('0.5s ease-in', style({opacity: 1, transform: 'translateY(0px)' })), animateChild()],
        { optional: true }
      ),
    ]),
  ]),
]);
