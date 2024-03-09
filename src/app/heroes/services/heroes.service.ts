import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroService {
  constructor(private http: HttpClient) { }

  private baseUrl: string = environments.baseUrl

  getheroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(`${this.baseUrl}/heroes`)
  }



}
