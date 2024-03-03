import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./public/pages/login/login.component";
import {NotFoundPageComponent} from "./components/not-found-page/not-found-page.component";
import {UserRegisterComponent} from './public/pages/user-register/user-register.component';
import {MainComponent} from './public/pages/main/main.component';
import {AuthGuard} from "./auth/guards/auth.guard";
import {RegistrationAppComponent} from "./public/pages/registration-app/registration-app.component";

const routes: Routes = [
  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {path: '', component: MainComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: UserRegisterComponent},
  {path: 'auth/registration-application', component: RegistrationAppComponent},
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./private/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./private/user/user.module').then(m => m.UserModule),
  },
  {path: '**', component: NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
