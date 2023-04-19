import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {MovieService} from "./services/movie.service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Subliminal';

  email = '';
  password = '';

  ngOnInit(): void {
    const token = localStorage.getItem("access_token");
    if(token){
      this.authService.is_authenticated = true;
    }
  }

  constructor(private movieService: MovieService, public router: Router, private authService: AuthService) {}

  login(){
    this.movieService.login(this.email, this.password).subscribe((data)=>{
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      this.authService.is_authenticated = true;
      this.email = '';
      this.password = '';
    });
  }



  logout(){
    this.authService.is_authenticated = false;
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  }
}
