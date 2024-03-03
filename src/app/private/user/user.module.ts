import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdbValidationModule } from "mdb-angular-ui-kit/validation";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { MdbCheckboxModule } from "mdb-angular-ui-kit/checkbox";
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { HttpClientModule } from "@angular/common/http";
import { ResourceComponent } from './components/resource/resource.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MaxAndMinValueDirective } from "../../directives/max-and-min-value.directive";
import { ModalReserveResourceComponent } from './components/modal-reserve-resource/modal-reserve-resource.component';
import { MdbCarouselModule } from "mdb-angular-ui-kit/carousel";

@NgModule({
  declarations: [
    BookingsComponent,
    CalendarComponent,
    ResourceComponent,
    ResourcesComponent,
    MaxAndMinValueDirective,
    ModalReserveResourceComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MdbFormsModule,
    FormsModule,
    MdbValidationModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MdbCheckboxModule,
    HttpClientModule,
    MdbAccordionModule,
    MatDatepickerModule,
    MdbCarouselModule,
  ], providers: [
    MatNativeDateModule,
  ]

})

export class UserModule {
}
