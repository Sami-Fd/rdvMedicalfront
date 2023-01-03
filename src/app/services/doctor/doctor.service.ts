import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  getAllDoctors() {
    return this.http.get(environment.API_URL + '/doctor');
  }
  
  getOneDoctor(id: any) {
    return this.http.get(environment.API_URL + '/doctor/' + id);
  }

  updateDoctor(id: any, data: any) {
    return this.http.patch(environment.API_URL + '/doctor/' + id, data);
  }

  deleteDoctor(id: any) {
    return this.http.delete(environment.API_URL + '/doctor/' + id);
  }

}
