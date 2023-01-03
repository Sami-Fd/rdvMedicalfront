import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { SettingComponent } from './components/setting/setting.component';
import { AuthGuardService } from './services/auth/guard/auth-guard-service.guard';
import { GuestGuard } from './services/auth/guard/guest.guard';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuardService]},
  { path: 'patient', component: PatientComponent , canActivate: [AuthGuardService]},
  { path: 'doctor', component: DoctorComponent , canActivate: [AuthGuardService]},
  { path: 'setting', component: SettingComponent , canActivate: [AuthGuardService]},
  { path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuardService]},
  { path: 'auth', component: AuthComponent, canActivate: [GuestGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [GuestGuard]},
  { path: '', component: HomeComponent, canActivate: [GuestGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
