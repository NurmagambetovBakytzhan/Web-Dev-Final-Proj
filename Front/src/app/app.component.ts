import {Component, OnInit} from '@angular/core';
import {MovieService} from "./services/movie.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Front';

  is_authenticated = false;
  email= '';
  password = '';

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if(token){
      this.is_authenticated = true;
    }
  }
  constructor(private movieService: MovieService) {
  }

  login(){
    this.movieService.login(this.email, this.password).subscribe((data) =>{
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      this.is_authenticated = true;
      this.email = '';
      this.password = '';
    });
  }

  logout(){
    this.is_authenticated = false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }


}
