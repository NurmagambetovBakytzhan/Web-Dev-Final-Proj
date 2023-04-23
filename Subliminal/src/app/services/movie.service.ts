import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IMovie} from "../models/movie";
import {AuthToken} from "../models/authToken";
import {Observable} from "rxjs";
import { HttpClientModule } from '@angular/common/http';

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
    return this.http.get<IMovie[]>(`${this.URL}/movies/`);
  }


}
