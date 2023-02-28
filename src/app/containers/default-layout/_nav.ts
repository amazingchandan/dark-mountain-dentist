import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon:'fa-solid fa-gauge'

  },
  {
    name: 'Registered Dentists',
    url: '/registered-dentists',
    icon:'fa-solid fa-users'
  },
  {
    name: 'Registration Form',
    url: '/register-form'
  },
  {
    name: 'Uploaded X-Rays',
    url: '/uploaded-xray',
    icon: 'fa-solid fa-teeth-open'
  },
  {
    name: 'Manage Subscription',
    url: '/subscription-list',
    icon: 'fa-sharp fa-regular fa-rectangle-list'
  },

/*  {
    name: 'Charts',
    url: '/charts',
    iconComponent: { name: 'cil-chart-pie' }
  },


  {
    name: 'Widgets',
    url: '/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },*/
];
