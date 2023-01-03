import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private scheduleService: ScheduleService,
    private appointmentService: AppointmentService,
    public authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}
  items: any;
  appointmentData: any = {};
  isLogged: boolean = false;
  triggerForm: boolean = false;
  isPatient: boolean = false;
  triggerValidationForm: boolean = false;
  selectedDoctor: any;
  docImgUrl: string= ""

  ngOnInit() {
    this.scheduleService.getSchedules().subscribe((data:any) => {
      console.log(data);
      this.items = data.data;
    });
    if (this.authService.isLogged()) {
      this.isLogged = true;
    }
    console.log(this.authService.isPatient());
    this.isPatient = this.authService.isPatient();
  }

  appointementDetails(item: any) {
    if (!this.authService.isLogged()) {
      this.router.navigate(["/auth"]);
    }
    console.log(this.triggerForm, item);
    this.triggerForm = true;
    this.selectedDoctor = item;
    this.docImgUrl = environment.Static_URL + item.doctor[0].image;
    console.log(this.selectedDoctor);
  }

  bookAppointment(item: any, schedule: any) {
    item.isBooked = true;
    console.log(item, schedule);
    this.appointmentData = {
        doctor_id: schedule.doctor_id,
        doctor_schedule_id: schedule,
        appointment_number: 1,
        reason_for_appointment: "",
        appointment_time: item.time,
        status: "pending",
        patient_come_into_hospital: false,
        doctor_comment: "",
    }
    this.triggerValidationForm = true;
    console.log(this.selectedDoctor, this.appointmentData);
  }
  confirmAppointment() {
    console.log(this.appointmentData);
    if(this.appointmentData.reason_for_appointment == "") return this.messageService.add({severity:'error', summary: 'Error', detail: "Please enter reason for appointment"});
    this.appointmentService.createAppointment(this.appointmentData).subscribe((data:any) => {
      console.log(data);
      if(data){
        this.triggerForm = false;
        this.triggerValidationForm = false;
        this.messageService.add({severity:'success', summary: 'Success', detail: data.message});
        this.router.navigate(["/patient"]);
      }
      
      //this.ngOnInit();
    });
  }
}
