import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { BooksComponent } from './Medicament/Medicament.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PatientComponent } from './patient/patient.component';
import { PatDetailsComponent } from './pat-details/pat-details.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'site',
    component: LayoutComponent,
    children: [
      {
        path: 'Medicament',
        component: BooksComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'patients',
        component: PatientComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'details/:id',
        component: PatDetailsComponent,
      }
     
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
