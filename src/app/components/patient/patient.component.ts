import { Component } from "@angular/core";
import { AppointmentService } from "src/app/services/appointment/appointment.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { PatientService } from "src/app/services/patient/patient.service";

@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.scss"],
})
export class PatientComponent {
  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  items: any;
  isLogged: boolean = false;

  ngOnInit() {
    this.appointmentService.getAllAppointment().subscribe((data:any) => {
        console.log(data);
        this.items = data.appointment;
        console.log(this.items);
    });

    if (this.authService.isLogged()) {
      this.isLogged = true;
    }
  }
}
