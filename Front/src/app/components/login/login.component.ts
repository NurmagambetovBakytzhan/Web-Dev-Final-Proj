import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthToken} from "../../models/authToken";
import { FormsModule } from '@angular/forms'; // import the FormsModule
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email : string | undefined;
  password: string | undefined;

  // is_logged = false;

  constructor(private http:HttpClient) {
  }


  onSubmit() {
    this.http.post<AuthToken>('users/token/', {email: this.email, password: this.password})
      .subscribe(
        response => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
        });
  }
}
