import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IHero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ){}

  ngOnInit(): void {
    if ( !this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroService.getHeroById(id)),
      )
      .subscribe( hero => {
        if ( !hero ) return this.router.navigateByUrl('/');

        this.newHero.reset( hero );
        return;
      })
  }

  public publishers = [
    { id: 'DC Comics', value: 'DC - Comics' },
    { id: 'Marvel Comics', value: 'Marvel - Comics' }
  ];


  public newHero = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  })

  get currenteHero(): IHero {
    const hero = this.newHero.value as IHero;
    return hero;
  }

  onSubmit(): void {
    if ( this.newHero.invalid ) return;

    if ( this.currenteHero.id ) {
      this.heroService.updateHero( this.currenteHero )
      .subscribe(hero => {
        this.showSnackBar(`${hero.superhero} actualizado`)

      })

      return;
    }

   this.heroService.addNewHero( this.currenteHero )
      .subscribe(hero => {
        this.showSnackBar(`${ hero.superhero } creado correctamente`);
        this.router.navigate(['heroes/edit', hero.id ])
      })
  }

  confirmDeleteHero():void {
    if( !this.currenteHero.id ) throw Error('El id del héroes es requerido');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.newHero.value ,
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result:boolean) => result ),
      switchMap( () => this.heroService.deleteHero( this.currenteHero.id )),
      filter( (deleted:boolean) => deleted ),
    )
    .subscribe( () => {
      this.router.navigate(['heroes/list'])
    });
  }


  showSnackBar( message: string ):void {
    this.snackBar.open( message, 'Cerrar', {
      duration: 2500
    })
  }
}
