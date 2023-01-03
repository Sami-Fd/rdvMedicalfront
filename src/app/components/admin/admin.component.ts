import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  data: any = {}
  type = 'admin'
  constructor(private authService:AuthService, private messageService:MessageService, private router:Router ) { }
  ngOnInit(): void {
  }
  onSignIn(f:any): void {
    console.log(this.data);
    if(f.invalid) return;
    console.log(this.data, this.type);
    this.data.role = 2;
    this.authService.signin(this.data).subscribe(async (res:any) => {
      if (res.access_token == null) {
        this.messageService.add({severity:'error', summary: 'Error', detail: res.message, life: 3000});
        return;
      }
      await localStorage.setItem('token', JSON.stringify(res.access_token));
      await localStorage.setItem('user', JSON.stringify([res.user]));
      this.router.navigate(['/dashboard']);
    });
    this.data = {}
  }
}
