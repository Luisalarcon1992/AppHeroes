import { Component, OnInit } from '@angular/core';
import { IHero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{


  public heroes: IHero[] = [];

  constructor(private heroesServices: HeroService) {}

  ngOnInit() {
    this.heroesServices.getheroes()
    .subscribe(heroes => this.heroes = heroes)
  }
}
