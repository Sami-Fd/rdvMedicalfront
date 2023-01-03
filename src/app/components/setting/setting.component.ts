import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { SettingService } from 'src/app/services/setting/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  genders: any[]= [];
  items: any[] = [];
  data: any = {}
  dt: Date = new Date();
  type = 'patient'
  
  constructor(public authService: AuthService,
      private route: ActivatedRoute, private router: Router, private messageService: MessageService,
      private doctorService: DoctorService, private patientService: PatientService, private settingService: SettingService) { }
  ngOnInit(): void {
    let user = JSON.parse(this.authService.getUser()!);
    user[0].dateOfBirth = new Date(user[0].dateOfBirth);
    this.data = user[0];
    switch (user[0].user?.role) {
      case 0:
        this.type = 'doctor';
        break;
      case 1:
        this.type = 'patient';
        break;
      // case 2:
      //   this.type = 'admin';  
      default:
        break;
    }
 this.genders = [
   {name: 'Male', code: 'Male'},
   {name: 'Female', code: 'Female'},
 ];
    if(this.authService.isAdmin()){
      this.settingService.getUsers().subscribe((res: any) => {
        console.log(res);
        this.items = res;
      }
      )
    }
  }

  triggerDialog(item:any, dialog:any) {
    //item.doctor_id.image = environment.Static_URL + item.doctor_id.image;
    console.log(item, dialog);
    if(dialog == "update"){
    }
    if(dialog == "details"){
    }
    if(dialog == "validation"){
    }
    if(dialog == "cancel"){
    }
  }


   onUpdateUser(f:any): void {  
    if(f.invalid) return this.messageService.add({severity:'error', summary: 'Error', detail: 'Please fill in all fields'});
    delete this.data.user
    delete this.data.image
    let formData = new FormData();
    for (let key in this.data) { 
        //console.log(key, this.data[key]);
        formData.append(key, this.data[key]);
    }
    console.log(formData);
    if(this.type === 'doctor') {
      this.doctorService.updateDoctor(this.data._id, formData).subscribe((res: any) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: res.message});
        localStorage.setItem('user', JSON.stringify([res.doctor]));
        window.location.reload()
      }, (err: any) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'update failed'});
      }); 
    } else if(this.type === 'patient') {
      this.patientService.updatePatient(this.data._id, formData).subscribe((res: any) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: res.message});
        console.log(res);
        localStorage.setItem('user', JSON.stringify([res.patient]));
        window.location.reload()
      }, (err: any) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'User update failed'});
      });
    }
   }
   onBasicUpload(event:any) { 
      const file = event.files[0];
      this.data.file = file;
  }
}
