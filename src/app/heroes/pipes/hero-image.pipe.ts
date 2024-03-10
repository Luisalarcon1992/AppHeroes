import { Pipe, PipeTransform } from '@angular/core';
import { IHero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: IHero): string {

    if (!hero.id && !hero.alt_img) return 'assets/no-image.png';

    if( hero.alt_img ) return hero.alt_img; // sería una url

    return `assets/heroes/${ hero.id }.jpg`; // img stático
  }

}
