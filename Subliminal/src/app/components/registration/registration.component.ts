import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionId} from "../../models/sessionId";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email: string | undefined;
  password: string | undefined;
  password_again: string | undefined;

  session_id: string | undefined;


  constructor(private http: HttpClient, public router: Router) {
  }

  signup(): void {
    if (this.password !== this.password_again) {
      console.error("Passwords do not match");
      return;
    }

    const body = {email: this.email, password: this.password};
    this.http.post<SessionId>('http://127.0.0.1:8000/api/v1/users/create/', body).subscribe(
      response => {
        this.session_id = response.session_id;
        localStorage.setItem('session_id', response.session_id);
        this.router.navigate(['/verify-registration'])
      },
      error => console.error(error)
    );
  }
}
