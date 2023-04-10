import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IMovie} from "../models/movie";
import {Observable} from "rxjs";
import {AuthToken} from "../models/authToken";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  URL = 'http://127.0.0.1:8000/api/v1';



  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthToken>{
    return this.http.post<AuthToken>(`${this.URL}/users/token/`,{
      email,
      password
    });
  }
  getMovies(): Observable<IMovie[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IMovie[]>(`${this.URL}/movies/`, { headers });
  }
}
