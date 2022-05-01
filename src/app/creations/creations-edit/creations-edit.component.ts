import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as CreationsActions from '../store/creations.actions';

@Component({
  selector: 'app-creations-edit',
  templateUrl: './creations-edit.component.html',
  styleUrls: ['./creations-edit.component.css'],
})
export class CreationsEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  creationsForm: FormGroup;
  //isLoading = false;
  message: string;
  onChange: Function;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let creationTitle = '';
    let creationBody = '';

    if (this.editMode) {
      this.storeSub = this.store
        .select('creations')
        .pipe(
          map((creationsState) => {
            return creationsState.creationsArray.find((creation, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((creation) => {
          creationTitle = creation.title;
          creationBody = creation.creationBody;
        });
    }
    this.creationsForm = new FormGroup({
      title: new FormControl(creationTitle, Validators.required),
      creationBody: new FormControl(creationBody, Validators.required),
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onSave() {
    const newCreation = this.creationsForm.value;
    console.log(newCreation);
    if (this.editMode) {
      this.store.dispatch(
        new CreationsActions.UpdateCreation({
          index: this.id,
          creation: newCreation,
        })
      );
    } else {
      this.store.dispatch(new CreationsActions.AddCreation(newCreation));
    }
    this.store.dispatch(new CreationsActions.StoreCreations());
    this.store.dispatch(new CreationsActions.FetchCreations());
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/creations']);
  }
}
