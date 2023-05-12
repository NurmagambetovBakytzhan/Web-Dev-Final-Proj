import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  is_authenticated: boolean = false;
  URL = 'http://127.0.0.1:9111/api/v1';
  constructor() { }
}
