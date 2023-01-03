import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  user: any;

  signin(data: object) {
    this.user = this.http.post(environment.API_URL + '/auth/signin', data);
    return this.user
  }
  
  signup(data: any) {
    let formData = new FormData();
    formData.append('file', data.file);
    formData.append('gender', data.gender);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);
    formData.append('phone', data.phone);
    formData.append('address', data.address);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("degree", data.degree)
    formData.append("speciality", data.speciality)
    formData.append("dateOfBirth", data.dateOfBirth)
    formData.append("status", data.status)
    return this.http.post(environment.API_URL + '/auth/signup', formData); 
  }

  logout() {
    localStorage.removeItem('token');
    return localStorage.removeItem('user');
  }
  
  isLogged() {
    return localStorage.getItem('token')?.toString();
  }

  isAdmin(){
    if(this.getUser() == null) return false;
    let user = JSON.parse(this.getUser()!);
    return user[0]?.role == 2;
  }

  isDoctor(){
    if(this.getUser() == null) return false;
    let user = JSON.parse(this.getUser()!);
    return user[0].user?.role == 0;
  }

  isPatient(){
    if(this.getUser() == null) return false;
    let user = JSON.parse(this.getUser()!);
    return user[0].user?.role == 1;
  }

  getUser() {
    return localStorage.getItem('user');;
  }

}
