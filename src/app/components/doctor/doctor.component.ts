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

  triggerForm(item:any, type:string) {
    console.log(item, type);
    if(type == 'update') {
      this.isUpdate = true;
      this.triggerScheduleForm = true;
      item.doctor_schedule_date = new Date(item.doctor_schedule_date);
      item.doctor_schedule_start_time = new Date(item.doctor_schedule_date.setHours(new Date(item.doctor_schedule_start_time).getHours(),new Date(item.doctor_schedule_start_time).getMinutes()));
      item.doctor_schedule_end_time = new Date(item.doctor_schedule_date.setHours(new Date(item.doctor_schedule_end_time).getHours(),new Date(item.doctor_schedule_end_time).getMinutes()));
      this.scheduleForm = item;
    }
    if(type == 'remove') {
      this.triggerDialog = true;
      this.scheduleForm = item;
    }
    console.log(this.isUpdate);
  }

  addSchedule(f: any) {
    this.isUpdate = false;
    if(f.invalid) return
    this.scheduleForm.doctor_schedule_date = new Date(this.scheduleForm.doctor_schedule_date);
    this.scheduleForm.doctor_schedule_start_time = new Date(this.scheduleForm.doctor_schedule_date.setHours(this.scheduleForm.doctor_schedule_start_time.getHours(),this.scheduleForm.doctor_schedule_start_time.getMinutes()))
    this.scheduleForm.doctor_schedule_end_time = new Date(this.scheduleForm.doctor_schedule_date.setHours(this.scheduleForm.doctor_schedule_end_time.getHours(),this.scheduleForm.doctor_schedule_end_time.getMinutes()));
    console.log("addSchedule", this.scheduleForm);
    this.scheduleService.createSchedule(this.scheduleForm).subscribe((data:any) => {
      console.log(data);
      this.messageService.add({severity:'success', summary:'Service Message', detail: data.message});
      this.triggerScheduleForm = false;
      this.ngOnInit();
      this.scheduleForm = {};
    });
  }

  updateSchedule(f: any) {
    if(f.invalid) return
    console.log("updateSchedule", this.scheduleForm);
    let data = {
      doctor_schedule_date: this.scheduleForm.doctor_schedule_date,
      doctor_schedule_start_time: this.scheduleForm.doctor_schedule_start_time,
      doctor_schedule_end_time: this.scheduleForm.doctor_schedule_end_time,
      average_consulting_time: this.scheduleForm.average_consulting_time,
      timeSlot: this.scheduleForm.timeSlot,
      doctor_schedule_status: this.scheduleForm.doctor_schedule_status
    }
    console.log(data);
    this.scheduleService.updateSchedule(this.scheduleForm._id, data).subscribe((data:any) => {
      console.log(data);
      this.messageService.add({severity:'success', summary:'Service Message', detail: data.message});
      this.triggerScheduleForm = false;
      this.scheduleForm = {};
      this.isUpdate = false;
      this.ngOnInit();
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
