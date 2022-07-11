import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap } from 'rxjs';
import { IAuthData } from '../interfaces/iauth-data';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  autSubject = new BehaviorSubject<IAuthData | null>(null);

  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUserStorage();
  }

  restoreUserStorage() {
    const json = localStorage.getItem('isAuthenticated');
    if (json) {
      const user = JSON.parse(json);
      if (this.helper.isTokenExpired(user.accessToken)) {
        return
      } else {
        this.autSubject.next(user);
      }
    }
  }

  login(user: IUser) {
    return this.http.post<IAuthData>('http://localhost:3000/login', user).pipe(
      tap((data) => {
        this.autSubject.next(data);
        localStorage.setItem('isAuthenticated', JSON.stringify(data));
      })
    );
  }

  signUp(user: IUser) {
    return this.http.post<IUser>('http://localhost:3000/register', user);
  }

  logout() {
    this.autSubject.next(null);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/home']);
  }
}
