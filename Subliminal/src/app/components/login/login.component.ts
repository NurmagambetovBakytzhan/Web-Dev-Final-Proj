import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthToken} from "../../models/authToken";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string | undefined;
  password: string | undefined;


  errorMessage: string | undefined;

  constructor(private http: HttpClient, public router: Router, public authService: AuthService) {
  }

  onSubmit() {
    this.http.post<AuthToken>('http://127.0.0.1:8000/api/v1/users/token/', {email: this.email, password: this.password})
      .subscribe(response => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.authService.is_authenticated = true;
        this.router.navigate(['/movies'])
      },
        error => {
          this.errorMessage = "Wrong email or password!"
        }
      );
  }

  ngOnInit(): void {
    if(this.authService.is_authenticated){
      this.router.navigate(['/movies'])
    }
    else {
      this.errorMessage=""
    }
  }


}
