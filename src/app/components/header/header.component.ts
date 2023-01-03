import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  user: any;
  isLogged: boolean = false;
  userMenu: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.authService.isLogged() ? this.isLogged = true : this.isLogged = false;
    if (this.authService.isLogged() !== null) {
      this.user = JSON.parse(this.authService.getUser()!);
    }
    this.userMenu = [
      {
        label: "Logout",
        icon: "pi pi-sign-out",
        command: () => {
          this.authService.logout();
          this.router.navigate(["/auth"])
        },
      },
    ];
  }
  emit() {
    this.toggle.emit(null);
  }
}
