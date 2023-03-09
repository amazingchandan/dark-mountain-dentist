import { INavData } from '@coreui/angular';
import { DefaultHeaderComponent } from '../default-layout/default-header/default-header.component'
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
console.log(userInfo,"userrrr")

export const navItems:
 INavData[] =
  [

  {
    name: 'Dashboard',
    url: 'dashboard',
    icon:'fa-solid fa-house-chimney'

  },
  {
    name: 'Dentists',
    url: 'registered-dentists',
    icon:'fa-solid fa-user'
  },
  /*{
    name: 'Registration Form',
    url: 'register-form',
    icon: 'fa-solid fa-address-card'
  },*/

  {
    name: 'Uploaded X-Rays',
    url: 'uploaded-xray',
    icon: 'fa-solid fa-cloud-arrow-up'
  },
  {
    name: 'Manage Subscription',
    url: 'subscription-list',
    icon: 'fa-solid fa-bookmark'
  }

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

export const navItemsUser:
 INavData[] =
  [
    {
      name: 'Dashboard',
      url: 'dashboard',
      icon:'fa-solid fa-house-chimney'

    },
    {
      name: 'Upload X-ray',
      url: 'upload-xray',
      icon:'fa-solid fa-cloud-arrow-up'

    },
    {
      name: 'Logout',
      url: 'login',
      icon: 'fa-solid fa-right-from-bracket'
    }
  ]

  