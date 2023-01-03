import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http:HttpClient) { }

  getUsers() {
    return this.http.get(environment.API_URL + '/user');
  }

  updateUser(id: any, data: any) {
    return this.http.patch(environment.API_URL + '/user/' + id, data);
  }

  deleteUser(id: any) {
    return this.http.delete(environment.API_URL + '/user/' + id);
  }
  
}
