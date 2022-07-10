import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsPage } from './pages/students/students.page';

const routes: Routes = [{
  path: 'students',
  component: StudentsPage
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
