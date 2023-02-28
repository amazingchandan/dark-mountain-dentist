import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { RegisteredDentistsComponent } from './views/pages/registered-dentists/registered-dentists.component';
import { DentistProfileComponent } from './views/pages/dentist-profile/dentist-profile.component';
import { ManageSubscriptionComponent } from './views/pages/manage-subscription/manage-subscription.component';
import { SubscriptionListComponent } from './views/pages/subscription-list/subscription-list.component';
import { UploadedXraysComponent } from './views/pages/uploaded-xrays/uploaded-xrays.component';
import { MarkXrayComponent } from './views/pages/mark-xray/mark-xray.component';
import { RegisterFormComponent } from './views/pages/register-form/register-form.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Dashboard'
    },

    children: [
      {
        path: 'dashboard',
        data: {
          title: ''
        },
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },

      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },

      {
        path: 'registered-dentists',
        component: RegisteredDentistsComponent,
        data: {
          title: 'Registered Dentists Page'
        }
      },
      {
        path: 'register-form',
        component: RegisterFormComponent,
        data: {
          title: 'Add Dentist'
        }
      },
      {
        path: 'dentist-profile',
        component: DentistProfileComponent,
        data: {
          title: 'Dentist Profile Page'
        }
      },
      {
        path: 'manage-subscription',
        component:ManageSubscriptionComponent,
        data: {
          title: 'Manage Subscription Page'
        }
      },
      {
        path: 'subscription-list',
        component: SubscriptionListComponent,
        data: {
          title: 'Subscription List Page'
        }
      },
      {
        path: 'uploaded-xray',
        component: UploadedXraysComponent,
        data: {
          title: 'Uploaded XRay Page'
        }
      },
      {
        path: 'mark-xray',
        component: MarkXrayComponent,
        data: {
          title: 'Mark XRay Page'
        }
      },

    ]
  },

  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },

  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },

  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
