import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  is_authenticated: boolean = false;

  constructor() { }
}
