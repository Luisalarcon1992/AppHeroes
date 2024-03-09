import { Component, Input, OnInit } from '@angular/core';
import { IHero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [

  ]
})
export class CardComponent implements OnInit{

  @Input()
  public hero!: IHero;

  ngOnInit(): void {
    if(!this.hero) throw Error('La propiedad Heroe es necesario')
  }

}
