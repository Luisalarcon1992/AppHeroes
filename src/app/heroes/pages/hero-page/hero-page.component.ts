import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { IHero, Publisher } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  constructor (
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {}

  public hero?: IHero;

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.heroService.getHeroById( id ))
    )
    .subscribe(
      hero => {
        if (!hero) return this.router.navigate(['/heroes/list']);
        return this.hero = hero;
      }
    )
  }

  goBack() {
    this.router.navigateByUrl('heroes/list')
  }
}
