import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }

  createPatient(data: any) {
    return this.http.post(environment.API_URL + '/patient', data);
  }

  getAllPatient() {
    return this.http.get(environment.API_URL + '/patient');
  }

  getOnePatient(id: any) {
    return this.http.get(environment.API_URL + '/patient/' + id);
  }

  updatePatient(id: any, data: any) {
    return this.http.patch(environment.API_URL + '/patient/' + id, data);
  } 

  deletePatient(id: any) {
    return this.http.delete(environment.API_URL + '/patient/' + id);
  }

}
