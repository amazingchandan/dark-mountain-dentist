import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
   
  },
  {
    name: 'Registered Dentists',
    url: '/registered-dentists',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Uploaded X-Rays',
    url: '/uploaded-xray',
    iconComponent: { name: 'cil-list-numbered' }
  },
  {
    name: 'Manage Subscription',
    url: '/subscription-list',
    iconComponent: { name: 'cil-list' }
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
