import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

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
      // @ts-ignore
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.userService.user = user;
      } else {
        // @ts-ignore
        this.userService.loadUser().subscribe();
      }
    }

  }

  constructor(private movieService: MovieService, private router: Router, public authService: AuthService, public userService:UserService) {}

  logout(){
    this.authService.is_authenticated = false;
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  sign_up_redirect(): void {
    this.router.navigate(['/registration'])
  }

  create_movie_redirect():void{
    this.router.navigate(['/create-movie'])
  }
}
