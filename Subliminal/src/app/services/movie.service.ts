import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IMovie} from "../models/movie";
import {AuthToken} from "../models/authToken";
import {Observable, retry} from "rxjs";
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private http: HttpClient, private authService: AuthService) {
  }

  login(email: string, password: string): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.authService.URL}/users/token/`, {
      email,
      password
    });
  }

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.authService.URL}/movies/`);
  }

  updateMovie(id: string | null, formData: FormData): Observable<IMovie> {
    const url = `${this.authService.URL}/movies/${id}/`;
    return this.http.put<IMovie>(url, formData);
  }

  createMovie(formData: FormData){
    const url = `${this.authService.URL}/movies/`
    return this.http.post(url, formData)
  }

  deleteMovie(id: string | null){
    const url = `${this.authService.URL}/movies/${id}/`;
    return this.http.delete<IMovie>(url).subscribe(
      ()=>console.log('Movie deleted'),
      error => console.log(error)
    )
  }

  createVideos(formData: FormData){
    const url = `${this.authService.URL}/videos/`
    return this.http.post(url,formData)
  }

  createImage(formData: FormData){
    const url = `${this.authService.URL}/movie-images/`
    return this.http.post(url, formData)
  }


}
