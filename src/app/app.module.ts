import { NgModule } from '@angular/core';
import {  LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';


import {  } from 'ngx-toastr';
// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

// import owl
import { CarouselModule } from 'ngx-owl-carousel-o';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,

} from '@coreui/angular';
//label studio
// import LabelStudio from "label-studio";

// paypal
import { NgxPayPalModule } from 'ngx-paypal';

import { NgxSpinnerModule } from "ngx-bootstrap-spinner";

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { PricingComponent } from './views/userPages/pricing/pricing.component';
import { DentistsComponent } from './views/dentists/dentists.component';
import { UploadXrayComponent } from './views/userpages/upload-xray/upload-xray.component';
import { EvaluateXrayComponent } from './views/userPages/evaluate-xray/evaluate-xray.component';
import { ViewXrayComponent } from './views/userPages/view-xray/view-xray.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { RenewSubComponent } from './views/userPages/renew-sub/renew-sub.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, PricingComponent, DentistsComponent, UploadXrayComponent, EvaluateXrayComponent, ViewXrayComponent, RenewSubComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    NgxImageZoomModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    NgxPayPalModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

