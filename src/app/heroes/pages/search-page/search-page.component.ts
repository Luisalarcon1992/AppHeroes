import { Component } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { IHero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: IHero[] = [];
  public selectedHero?: IHero;

  constructor(private heroService: HeroService){}

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroService.getSuggestions( value ).subscribe(
      hero => this.heroes = hero
    )
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent):void {
    console.log(event.option.value)
    if(!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: IHero = event.option.value;

    this.searchInput.setValue( hero.superhero );

    this.selectedHero = hero;
  }

}
