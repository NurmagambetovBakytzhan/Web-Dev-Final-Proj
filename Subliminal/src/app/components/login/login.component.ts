import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthToken} from "../../models/authToken";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string | undefined;
  password: string | undefined;

  errorMessage!: string;

  constructor(private http: HttpClient,
              public router: Router,
              public authService: AuthService,
              public userService: UserService) {
  }

  onSubmit() {
    this.http.post<AuthToken>(`${this.authService.URL}/users/token/`, {email: this.email, password: this.password})
      .subscribe(response => {

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.authService.is_authenticated = true;

        this.userService.loadUser()

      },
        error => {
          if(error.status=401){
            this.errorMessage = "Wrong email or password!"
          }
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
