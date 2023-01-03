import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import {MessageService} from 'primeng/api';
import { ScheduleService } from "src/app/services/schedule/schedule.service";
import { AppointmentService } from "src/app/services/appointment/appointment.service";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(
    private scheduleService: ScheduleService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}
  items: any;
  appointmentData: any = {};
  isLogged: boolean = false;
  triggerForm: boolean = false;
  triggerValidationForm: boolean = false;
  selectedDoctor: any;

  ngOnInit() {
    this.scheduleService.getSchedules().subscribe((data:any) => {
      console.log(data);
      this.items = data.data;
    });
    if (this.authService.isLogged()) {
      this.isLogged = true;
    }
  }

  appointementDetails(item: any) {
    if (!this.authService.isLogged()) {
      this.router.navigate(["/auth"]);
    }
    console.log(this.triggerForm, item);
    this.triggerForm = true;
    item.schedules.forEach((element: any) => {
      element.doctor_schedule_date = new Date(element.doctor_schedule_date)
        .toString()
        .slice(0, 10);
    });
    this.selectedDoctor = item;
  }

  bookAppointment(item: any, schedule: any) {
    item.isBooked = true;
    console.log(item, schedule);
    this.appointmentData = {
        doctor_id: this.selectedDoctor._id,
        doctor_schedule_id: schedule,
        appointment_number: 1,
        reason_for_appointment: "",
        appointment_time: schedule.doctor_schedule_date + " at " +item.time,
        status: "pending",
        patient_come_into_hospital: false,
        doctor_comment: "",
    }
    this.triggerValidationForm = true;
    console.log(this.selectedDoctor, this.appointmentData);
  }
  confirmAppointment() {
    console.log(this.appointmentData);
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
