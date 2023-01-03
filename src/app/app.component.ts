import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MegaMenuItem, MenuItem } from "primeng/api";
import { AuthService } from "./services/auth/auth.service";
import { environment } from "src/environments/environment";

interface RouteList {
  name: string;
  icon: string;
  code: string;
  path: string;
  disabled?: boolean;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  imgUrl: string = "";
  showHeader: boolean = false;
  
  constructor(public authService: AuthService, private router: Router) {
    
  }
  title = "appointement";
  leftOpened = true;
  toggle() {
    this.leftOpened = !this.leftOpened;
  }

  ngOnInit() {
  }

  // onRouteChange(route: any) {
  //   console.log(route);
  //   this.router.navigate([route.value]);
  // }

  // isLogged() {
  //   return this.authService.isLogged();
  // }

  // logout() {
  //   console.log("logout");
  //   this.authService.logout();
  //   this.router.navigate(["/auth"]);
  // }
}
