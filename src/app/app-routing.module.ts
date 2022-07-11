import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './auth/login/login.page';
import { SignupPage } from './auth/signup/signup.page';
import { AuthGuard } from './auth/auth.guard';
import { StudentsPage } from './pages/students/students.page';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [{
  path: 'students',
  canActivate : [AuthGuard],
  component: StudentsPage
},
{
  path: 'home',
  component:HomePage
},
{
  path: 'login',
  component:LoginPage
},
{
  path: 'register',
  component:SignupPage
},
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
