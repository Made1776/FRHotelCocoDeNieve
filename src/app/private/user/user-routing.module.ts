import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from "../components/layout/layout.component";
import { HomeComponent } from "../components/home/home.component";
import { BookingsComponent } from "./pages/bookings/bookings.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { ProfileSettingsComponent } from '../components/profile-settings/profile-settings.component';
import { SubmenusComponent } from '../components/submenus/submenus.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent,
      },
      {
        path: 'bookings', component: BookingsComponent,
      },
      {
        path: 'calendar', component: CalendarComponent,
      },
      {
        path: 'profile-settings', component: ProfileSettingsComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
