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
    private router: Router,
  ) {}
  env:any = environment;
  items: any;
  appointmentData: any = {};
  isLogged: boolean = false;
  triggerForm: boolean = false;
  isPatient: boolean = false;
  triggerValidationForm: boolean = false;
  selectedDoctor: any;
  docImgUrl: string= ""
  showTable: boolean = false;

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
    this.triggerForm = true;
    this.selectedDoctor = item;
    this.docImgUrl = environment.Static_URL + item.doctor[0].image;
  }

  bookAppointment(scheduleTime: any, item: any, idx:any) {
    scheduleTime.isBooked = true;
    //console.log("book", scheduleTime, item, idx);
    item.timeSlot = item.timeSlot;
    let schedule = item.doctor[0];
    schedule._id = item.doctor_schedule_id[idx];
    schedule.timeSlot = item.timeSlot[idx];
    console.log(schedule);
    this.appointmentData = {
        doctor_id: item._id,
        doctor_schedule_id: schedule,
        appointment_number: 1,
        reason_for_appointment: "",
        appointment_time: scheduleTime.time,
        status: "pending",
        patient_come_into_hospital: false,
        doctor_comment: "",
    }
    this.triggerValidationForm = true;
    console.log(this.appointmentData);
  }
  confirmAppointment() {
    console.log(this.appointmentData);
    if(this.appointmentData.reason_for_appointment == "") return this.messageService.add({severity:'error', summary: 'Error', detail: "Please enter reason for appointment"});
    this.appointmentService.createAppointment(this.appointmentData).subscribe((data:any) => {
      if(data){
        this.triggerForm = false;
        this.triggerValidationForm = false;
        this.messageService.add({severity:'success', summary: 'Success', detail: data.message});
        this.router.navigate(["/patient"]);
      }
    });
  }
}
