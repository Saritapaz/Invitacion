import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [

  transition('* <=> *', [

    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%'
      })
    ], { optional: true }),

    group([

      query(':leave', [
        animate('400ms ease', style({ opacity: 0 }))
      ], { optional: true }),

      query(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in-out', style({ opacity: 1 }))
      ], { optional: true })

    ])

  ])

]);