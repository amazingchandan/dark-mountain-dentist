import { INavData } from '@coreui/angular';

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
  },
  {
    name: 'Logout',
    url: 'login',
    icon: 'fa-solid fa-right-from-bracket'
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
     
      
    /* :`${  Swal.fire({
        title: 'Are you sure?',
        text: "You won't be Logout!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: 'Success!',
            text: 'You Have Been Successfully Logged-out',
            icon: 'success',
          });
        
        }
      })}`*/
      url:'login',
      icon: 'fa-solid fa-right-from-bracket'
    }
  ]



