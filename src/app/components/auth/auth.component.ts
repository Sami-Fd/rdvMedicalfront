import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  genders: any[];
  authOptions: any[];
  userType: any[];

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
     private route: ActivatedRoute, private router: Router, private messageService: MessageService) {
    this.genders = [
      {name: 'Male', code: 'Male'},
      {name: 'Female', code: 'Female'},
    ];
    this.authOptions = [
      {name: 'Sign In', code: true},
      {name: 'Sign Up', code: false},
    ];
    this.userType = [
      {name: 'Patient', type: 'patient'},
      {name: 'Doctor', type: 'doctor'},
    ];
  }
  authOption = {name: 'Sign In', code: true};
  data: any = {}
  type = 'patient'

  ngOnInit(): void {
    this.router.navigate(['/auth'], { queryParams: { type: 'patient' } , queryParamsHandling: 'merge'});
    this.route.queryParams.subscribe((params:any) => {
      this.type = params.type
    })
  }

  onTypeChange(){
    if(this.type == 'patient') {
      this.router.navigate(['/auth'], { queryParams: { type: 'patient' } , queryParamsHandling: 'merge'});
    } else if(this.type == 'doctor') {
      this.router.navigate(['/auth'], { queryParams: { type: 'doctor' } , queryParamsHandling: 'merge' });
    }
  }

  onBasicUpload(event:any) {
    const file = event.files[0];
    this.data.file = file;
    //this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  onSignIn(f:any): void {
    console.log(this.data);
    if(f.invalid) return;
    console.log(this.data, this.type);
    if(this.type === 'patient') {
      this.data.role = 1;
      this.authService.signin(this.data).subscribe(async (res:any) => {
        if (res.access_token == null) {
          this.messageService.add({severity:'error', summary: 'Error', detail: res.message, life: 3000});
          return;
        }
        await localStorage.setItem('token', JSON.stringify(res.access_token));
        await localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard']);
      });
    } else if(this.type === 'doctor') {
      this.data.role = 0;
      this.authService.signin(this.data).subscribe(async (res:any) => {
        await localStorage.setItem('token', JSON.stringify(res.access_token));
        await localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard']);
      });
    }
    this.data = {}
  }
  onSignUp(f:any): void {
    //if(f.invalid) return;
    console.log(this.data, this.type,f);
    if(this.type == 'patient') {
      this.data.role = 1;
      this.authService.signup(this.data).subscribe((res:any) => {
        if (res.user) {
          this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
          this.router.navigate(['/auth'], { queryParams: { type: 'patient' } , queryParamsHandling: 'merge'});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: res.message, life: 3000});
        }
      });
    }else if(this.type == 'doctor') {
      this.data.role = 0;
      this.authService.signup(this.data).subscribe((res:any) => {
        if (res.doctor) {
          this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
          this.router.navigate(['/auth'], { queryParams: { type: 'doctor' } , queryParamsHandling: 'merge'});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: res.message, life: 3000});
        }
      });
    }
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}
