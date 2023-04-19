import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{
  email = '';
  password = '';

  ngOnInit(): void {
    const token = localStorage.getItem("access_token");
    if(token){
      this.authService.is_authenticated = true;
    }
  }

  constructor(private movieService: MovieService, private router: Router, public authService: AuthService) {}

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
    this.router.navigate(['/login'])
  }
  sign_up_redirect(): void {
    this.router.navigate(['/registration'])
  }
}
