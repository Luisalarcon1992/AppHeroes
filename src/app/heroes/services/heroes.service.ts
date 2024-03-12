import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { IHero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroService {
  constructor(private http: HttpClient) { }

  private baseUrl: string = environments.baseUrl;



  getheroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(`${this.baseUrl}/heroes`)
  }

  getHeroById( id: string ): Observable<IHero | undefined> {
    return this.http.get<IHero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError( error => of (undefined))
    )
  }

  getSuggestions( query: string): Observable<IHero[]> {
    return this.http.get<IHero[]>(`${this.baseUrl}/heroes?q=${ query }&_limit=6`);
  }


  addNewHero( hero: IHero ): Observable<IHero> {
    return this.http.post<IHero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero( hero: IHero ): Observable<IHero> {
    if( !hero.id ) throw Error('El ID es requerido')
    return this.http.patch<IHero>(`${this.baseUrl}/heroes/${ hero.id }`, hero);
  }

  deleteHero( id: string ): Observable<boolean> {

    return this.http.delete<boolean>(`${this.baseUrl}/heroes/${ id }`)
    .pipe(
      map( respose => true ),
      catchError( error => of ( false )),
    )
  }

}
