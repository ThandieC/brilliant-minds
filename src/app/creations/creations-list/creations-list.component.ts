import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as CreationsActions from '../store/creations.actions';
import { StoryModel } from '../../shared/story.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-creations-list',
  templateUrl: './creations-list.component.html',
  styleUrls: ['./creations-list.component.css']
})
export class CreationsListComponent implements OnInit, OnDestroy {

  sub: Subscription;
  newCreations = [];

  constructor (
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onUpdateCreationsList()
  }

  onUpdateCreationsList() {
    this.store.dispatch( new CreationsActions.FetchCreations() );
        this.sub = this.store.select( 'creations' ).pipe(
          map(
            CreationsState => {
              return CreationsState.creationsArray;
            }
          )
        ).subscribe(
          CreationsArray => {
            this.newCreations = CreationsArray;
          }
        );
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  onNewCreation() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
