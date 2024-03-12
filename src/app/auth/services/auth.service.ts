import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { IUser } from '../interfaces/user.interface';
import { Observable, catchError, map, tap, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private _baseUrl = environments.baseUrl;
  private _user?: IUser;

  constructor(private http: HttpClient) { }

  get currenteUser(): IUser | undefined {
    if ( !this._user ) return;

    return structuredClone(this._user);

  }


  checkAuth():Observable<boolean> | boolean {

    if ( !localStorage.getItem('token')) return false

    localStorage.getItem('token');

    return this.http.get<IUser>(`${ this._baseUrl }/users/1`)
    .pipe(
      tap( user => this._user = user),
      map( user => !!user),
      catchError( error => of (false))
    )
  }


  login( email: string, password: string):Observable<IUser> {

    return this.http.get<IUser>(`${this._baseUrl}/users/1`)
    .pipe(
      tap( user => this._user = user),
      tap( user => localStorage.setItem('token', 'asdasd.asdasdasd'))
    )
  }




  logout() {
    this._user = undefined;
    localStorage.clear()
  }
}
