import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User | undefined;

  constructor(private http: HttpClient, private authService: AuthService) { }


  loadUser(): Observable<User> | null{
    const token = localStorage.getItem('access_token');
    if (token) {
      return this.http.post<User>(`${this.authService.URL}/users/user/`, {'access_token': token}).pipe(
        tap(response => {
          localStorage.setItem('user', JSON.stringify(response));
          this.user = response;
        })
      );
    } else {
      return null;
    }
  }
}
