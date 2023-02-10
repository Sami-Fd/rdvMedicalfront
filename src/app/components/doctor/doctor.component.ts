import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { ScheduleService } from "src/app/services/schedule/schedule.service";
import {MessageService} from 'primeng/api';

@Component({
  selector: "app-doctor",
  templateUrl: "./doctor.component.html",
  styleUrls: ["./doctor.component.scss"],
})
export class DoctorComponent {
  constructor(
    private scheduleService: ScheduleService,
    private messageService: MessageService,
    private doctorService: DoctorService,
    private authService: AuthService
  ) {
  }

  isUpdate: boolean = false;
  items: any;
  minDate: Date = new Date();
  minStartTime: Date = new Date();
  minEndTime: Date = new Date(this.minStartTime.getTime() + 1 * (60 * 60 * 1000) );
  isLogged: boolean = false;
  triggerScheduleForm: boolean = false;
  triggerDialog: boolean = false;
  scheduleForm: any = {}

  ngOnInit() {
    let user = JSON.parse(this.authService.getUser()!);
    if (user[0]?._id) {
      this.scheduleService.getOneSchedule(user[0]?._id).subscribe((item: any) => {
        console.log(item);
        this.items = item.data;
      });
    }else if(user[0]?.role == 2){
      this.scheduleService.getSchedules().subscribe((item: any) => {
        console.log(item);
        this.items = item.data;
      });
    }

    if (this.authService.isLogged()) {
      this.isLogged = true;
    }
  }

  modelChange(event: any) {
    this.scheduleForm.doctor_schedule_date = event;
    this.scheduleForm.doctor_schedule_start_time = event;
    this.scheduleForm.doctor_schedule_end_time = event;
    console.log(this.scheduleForm);
  }

  triggerForm(item:any, type:string) {
    console.log(item, type);
    if(type == 'update') {
      this.isUpdate = true;
      this.triggerScheduleForm = true;
      item.doctor_schedule_date = new Date(item.doctor_schedule_date);
      item.doctor_schedule_start_time = new Date(item.doctor_schedule_start_time);
      item.doctor_schedule_end_time = new Date(item.doctor_schedule_end_time);
      this.scheduleForm = item;
    }
    if(type == 'remove') {
      this.triggerDialog = true;
      this.scheduleForm = item;
    }
  }

  addSchedule(f: any) {
    if(f.invalid) return
    console.log("addSchedule", this.scheduleForm);
    this.scheduleService.createSchedule(this.scheduleForm).subscribe((data:any) => {
      console.log(data);
      this.messageService.add({severity:'success', summary:'Service Message', detail: data.message});
      this.triggerScheduleForm = false;
      this.ngOnInit();
    });
  }

  updateSchedule(f: any) {
    if(f.invalid) return
    console.log("updateSchedule", this.scheduleForm);
    let data = {
      doctor_schedule_date: this.scheduleForm.doctor_schedule_date,
      doctor_schedule_start_time: this.scheduleForm.doctor_schedule_start_time,
      doctor_schedule_end_time: this.scheduleForm.doctor_schedule_end_time,
      doctor_schedule_status: this.scheduleForm.doctor_schedule_status
    }
    this.scheduleService.updateSchedule(this.scheduleForm._id, data).subscribe((data:any) => {
      console.log(data);
      this.messageService.add({severity:'success', summary:'Service Message', detail: data.message});
      this.triggerScheduleForm = false;
      this.scheduleForm = {};
    });
  }

  deleteSchedule(id: any) {
    this.scheduleService.deleteSchedule(id).subscribe((data: any) => {
      console.log(data);
      this.messageService.add({severity:'success', summary:'Service Message', detail: data.message});
      this.triggerDialog = false;
      this.ngOnInit();
    });
  }

}
