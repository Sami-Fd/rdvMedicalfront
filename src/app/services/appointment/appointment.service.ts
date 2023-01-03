import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  createAppointment(data: any) {
    return this.http.post(environment.API_URL + "/appointment", data);
  }

  getAllAppointment() {
    return this.http.get(environment.API_URL + "/appointment");
  }

  getOneAppointment(id: any) {
    return this.http.get(environment.API_URL + "/appointment/" + id);
  }

  updateAppointment(id: any, data: any) {
    return this.http.patch(environment.API_URL + "/appointment/" + id, data);
  }

  deleteAppointment(id: any) {
    return this.http.delete(environment.API_URL + "/appointment/" + id);
  }
}
