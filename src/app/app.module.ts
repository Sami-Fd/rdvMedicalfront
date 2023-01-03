import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {SlideMenuModule} from 'primeng/slidemenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MegaMenuModule} from 'primeng/megamenu';
import { HomeComponent } from './components/home/home.component';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { AuthComponent } from './components/auth/auth.component';
import {CardModule} from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';
import {SelectButtonModule} from 'primeng/selectbutton';
import { AuthGuardService } from './services/auth/guard/auth-guard-service.guard';
import { GuestGuard } from './services/auth/guard/guest.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MenuModule} from 'primeng/menu';
import {AvatarModule} from 'primeng/avatar';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ListboxModule} from 'primeng/listbox';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PatientComponent } from './components/patient/patient.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { SettingComponent } from './components/setting/setting.component';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DialogModule} from 'primeng/dialog';
import {InputSwitchModule} from 'primeng/inputswitch';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminComponent } from './components/admin/admin.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    DashboardComponent,
    PatientComponent,
    DoctorComponent,
    SettingComponent,
    AppointmentComponent,
    SidebarComponent,
    AdminComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AutoCompleteModule,
    FormsModule,
    InputTextModule,
    MenubarModule,
    SlideMenuModule,
    BrowserAnimationsModule,
    MegaMenuModule,
    ButtonModule,
    CardModule,
    TableModule,
    FileUploadModule,
    DropdownModule,
    ReactiveFormsModule,
    SelectButtonModule,
    MenuModule,
    AvatarModule,
    TieredMenuModule,
    ListboxModule,
    MessagesModule,
    ToastModule,
    CalendarModule,
    InputTextareaModule,
    DialogModule,
    InputSwitchModule
  ],
  providers: [AuthGuardService,GuestGuard,{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
