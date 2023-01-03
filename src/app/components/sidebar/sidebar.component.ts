import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

interface RouteList {
  name: string;
  icon: string;
  code: string;
  path: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  @Input() showSideMenu = true;
  routesList: RouteList[] = [];
  selectedItem: RouteList = {
    name: "Dashboard",
    icon: "pi pi-home",
    code: "dashboard",
    path: "/dashboard",
  };
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    console.log(this.authService.isAdmin());
    this.routesList = [
      {
        name: "Dashboard",
        icon: "pi pi-home",
        code: "dashboard",
        path: "/dashboard",
      },
      {
        name: "Appointments",
        icon: "pi pi-calendar",
        code: "appointments",
        path: "/appointment",
      },
      {
        name: "Settings",
        icon: "pi pi-cog",
        code: "settings",
        path: "/setting",
      },
    ];
    if (this.authService.isPatient()) {
      this.routesList.splice(2, 0, {
        name: "Patients",
        icon: "pi pi-users",
        code: "patients",
        path: "/patient",
      });
    }
    if (this.authService.isDoctor()) {
      this.routesList.splice(2, 0, {
        name: "Doctors",
        icon: "pi pi-heart",
        code: "doctors",
        path: "/doctor",
      });
    }
    if (this.authService.isAdmin()) {
      this.routesList.splice(
        2,
        0,
        {
          name: "Doctors",
          icon: "pi pi-heart",
          code: "doctors",
          path: "/doctor",
        },
        {
          name: "Patients",
          icon: "pi pi-users",
          code: "patients",
          path: "/patient",
        }
      );
    }
  }
  onRouteChange(route: any) {
    console.log(route);
    this.router.navigate([route.value]);
  }

}
