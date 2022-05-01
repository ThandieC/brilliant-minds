import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as CreationsActions from '../store/creations.actions';
import { StoryModel } from '../../shared/story.model';

@Component({
  selector: 'app-creations-page',
  templateUrl: './creations-page.component.html',
  styleUrls: ['./creations-page.component.css']
})
export class CreationsPageComponent implements OnInit {

  creation: StoryModel;
  id: number;

  constructor (
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('creations');
        }),
        map(creationsState => {
          return creationsState.creationsArray.find((creation, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(creation => {
        this.creation = creation;
      });
  }


  onEditCreation() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCreation() {
    this.store.dispatch( new CreationsActions.DeleteCreation( this.id ) )
    this.store.dispatch( new CreationsActions.StoreCreations() );
     this.router.navigate(['../'], {relativeTo: this.route});
  }

}
