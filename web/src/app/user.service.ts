import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // url = 'http://127.0.0.1:8000/api';
  url = 'https://bharath-django-angular.herokuapp.com/api';

  registerUser(userData): Observable<any> {
    return this.http.post(`${this.url}/users/`, userData);
  }

  loginUser(userData): Observable<any> {
    return this.http.post(`${this.url}/auth/`, userData);
  }
}
