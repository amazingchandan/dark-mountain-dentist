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
import { LogoutComponent } from './logout/logout.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { TestComponent } from './test/test.component';
import { FinancialComponent } from './financial/financial.component';
import { ViewAdminXrayComponent } from './view-admin-xray/view-admin-xray.component';

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
    LogoutComponent,
    ForgetPasswordComponent,
    SetNewPasswordComponent,
    TestComponent,
    FinancialComponent,
    ViewAdminXrayComponent,
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
