import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-registration',
  templateUrl: './verify-registration.component.html',
  styleUrls: ['./verify-registration.component.css']
})
export class VerifyRegistrationComponent {
  code: string | undefined;
  session_id: string | null = localStorage.getItem('session_id');

  constructor(private router: Router, private http: HttpClient) {}

  verify_registration():void{
    if (!this.session_id) {
      console.error('Session ID not found in localStorage');
      return;
    }

    const body = { code: this.code, session_id: this.session_id };
    this.http.post('http://127.0.0.1:8000/api/v1/users/verify/', body).subscribe(
      response => {
        console.log(response);
        this.router.navigateByUrl('/login', { state: { message: 'User created successfully' } });
      },
      error => console.error(error)
    );

  }



}
