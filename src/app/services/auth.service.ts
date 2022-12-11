import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(userData: any){
    localStorage.setItem('token', '--------AUTH_TOKEN_CODE--------');
  }

  logout(userData: any){
    localStorage.removeItem('token');
  }
}
