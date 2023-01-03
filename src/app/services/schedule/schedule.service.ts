import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient) { }

  getSchedules(){
    return this.http.get(environment.API_URL + '/schedule');
  }

  getOneSchedule(id: any) {
    return this.http.get(environment.API_URL + '/schedule/' + id);
  }

  createSchedule(data: any) {
    return this.http.post(environment.API_URL + '/schedule', data);
  }

  updateSchedule(id: any, data: any) {
    return this.http.patch(environment.API_URL + '/schedule/' + id, data);
  }

  deleteSchedule(id: any) {
    return this.http.delete(environment.API_URL + '/schedule/' + id);
  }

}
