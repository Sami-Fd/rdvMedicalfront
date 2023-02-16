import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  constructor(
    private scheduleService: ScheduleService,
    private appointmentService: AppointmentService,
    public authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}
  env:any = environment;
  items: any;
  appointmentData: any = {};
  isLogged: boolean = false;
  isDoctor: boolean = false;
  isPatient: boolean = false;
  triggerForm: boolean = false;
  triggerUpdateForm: boolean = false;
  triggerValidationForm: boolean = false;
  triggerAppointmentDetails: boolean = false;
  triggerAppointmentCancel: boolean = false;
  dialogAppointment: boolean = false;
  selectedDoctor: any;
  selectedAppointment: any = {};
  status: any;  
  ngOnInit() {
    this.status = [
      { label: 'Pending', value: 'pending'},
      { label: 'Confirmed', value: 'confirmed' },
      { label: 'Cancelled', value: 'cancelled' },
      { label: 'Completed', value: 'completed' },
    ];
    this.appointmentService.getAllAppointment().subscribe((data:any) => {
      console.log(data);
      this.items = data.appointment;
      localStorage.setItem("appointment Number", JSON.stringify(this.items.length));
    });
    if (this.authService.isLogged()) {
      this.isLogged = true;
    }
    this.isDoctor = this.authService.isDoctor();
    this.isPatient = this.authService.isPatient();
  }

  triggerDialog(item:any, dialog:any) {
    //item.doctor_id.image = environment.Static_URL + item.doctor_id.image;
    console.log(item, dialog);
    if(dialog == "update"){
      this.selectedAppointment = item;
      this.triggerUpdateForm = true;
    }
    if(dialog == "details"){
      this.selectedAppointment = item;
      this.triggerAppointmentCancel = false;
      this.triggerAppointmentDetails = true;
      this.dialogAppointment = true;
      console.log(this.triggerAppointmentCancel,this.triggerAppointmentDetails);
    }
    if(dialog == "validation"){
      this.selectedAppointment = item;
      this.triggerValidationForm = true;
    }
    if(dialog == "cancel"){
      this.selectedAppointment = item;
      this.triggerAppointmentDetails = false;
      this.triggerAppointmentCancel = true;
      this.dialogAppointment = true;
      console.log(this.triggerAppointmentCancel,this.triggerAppointmentDetails);
    }
  }
  appointmentDetails(item: any,ft:boolean) {
    this.selectedAppointment = item;
    this.triggerAppointmentDetails = true;
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
      this.ngOnInit();
    });
  }

  appointmentCancel(item:any) {
    let id = item._id;
    console.log(item);
    this.appointmentService.deleteAppointment(id).subscribe((data:any) => {
      if (data){
        this.triggerAppointmentCancel = false;
        this.dialogAppointment = false;
        this.messageService.add({severity:'success', summary: 'Success', detail: data.message});
        // this.scheduleService.updateSchedule(item.doctor_schedule_id._id, {timeSlot: item.doctor_schedule_id.timeSlot}).subscribe((data:any) => {
        //   console.log(data);
        // });
        this.ngOnInit();
      }
    });
  }

  

  appointmentUpdate(item:any) {
    console.log(item);
    let id = item._id;
    let params = {
      patient_come_into_hospital: item.patient_come_into_hospital,
      doctor_comment: item.doctor_comment,
      status: item.status,
    }
    this.appointmentService.updateAppointment(id,params).subscribe((data:any) => {
      console.log(data);
      if(data){
        this.triggerUpdateForm = false;
        this.messageService.add({severity:'success', summary: 'Success', detail: data.message});
      }
      this.ngOnInit();
    });
  }
}
