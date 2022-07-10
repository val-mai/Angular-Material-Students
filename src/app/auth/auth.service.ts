import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IAuthData } from '../interfaces/iauth-data';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  autSubject = new BehaviorSubject<IAuthData | null>(null);

  constructor(private http:HttpClient) { }

  login(user:IUser) {
    return this.http.post<IAuthData>('http://localhost:3000/login',user).pipe(
    tap(data =>{
      this.autSubject.next(data);
    }))

  }

  signUp(user:IUser) {
    return this.http.post<IUser>('http://localhost:3000/register',user);
  }
}
