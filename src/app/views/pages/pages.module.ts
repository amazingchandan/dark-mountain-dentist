import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { RegisteredDentistsComponent } from './registered-dentists/registered-dentists.component';
import { DataTablesModule } from 'angular-datatables';
import { DentistProfileComponent } from './dentist-profile/dentist-profile.component';
import { UploadedXraysComponent } from './uploaded-xrays/uploaded-xrays.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { ManageSubscriptionComponent } from './manage-subscription/manage-subscription.component';
import { MarkXrayComponent } from './mark-xray/mark-xray.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './register-form/register-form.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    RegisteredDentistsComponent,
    DentistProfileComponent,
    UploadedXraysComponent,
    SubscriptionListComponent,
    ManageSubscriptionComponent,
    MarkXrayComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule {
}
