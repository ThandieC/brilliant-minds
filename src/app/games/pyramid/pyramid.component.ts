import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as PyramidActions from './store/pyramid.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-pyramid',
  templateUrl: './pyramid.component.html',
  styleUrls: ['./pyramid.component.css'],
})
export class PyramidComponent implements OnInit {
  checked = false;
  success = false;
  showNext = false;
  num1: number;
  num2: number;
  total: string;
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
  input7: string;
  input8: string;
  initSub: Subscription;
  storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.onNewBox();
  }

  onNewBox() {
    this.store.dispatch(new PyramidActions.NewPyramid());
    this.initSub = this.store
      .select('pyramid')
      .pipe(
        map((pyramidState) => {
          return pyramidState;
        })
      )
      .subscribe((pyramidState) => {
        this.num1 = pyramidState.number1;
        this.num2 = pyramidState.number2;
        this.resetBox();
        this.showNext = false;
        this.checked = false;
      });
  }

  onCheckBox() {
    this.store.dispatch(
      new PyramidActions.AddPyramid({
        num1: +this.input1,
        num2: +this.input2,
        num3: +this.input3,
        num4: +this.input4,
        num5: +this.input5,
        num6: +this.input6,
        num7: +this.input7,
        num8: +this.input8,
      })
    );
    this.storeSub = this.store
      .select('pyramid')
      .pipe(
        map((pyramidState) => {
          return pyramidState.solved;
        })
      )
      .subscribe((solved) => {
        if (solved) {
          this.success = true;
          this.showNext = true;
        } else {
          this.success = false;
          this.showNext = false;
        }
        this.checked = true;
      });
  }

  resetBox() {
    this.input1 = null;
    this.input2 = null;
    this.input3 = null;
    this.input4 = null;
    this.input5 = null;
    this.input6 = null;
    this.input7 = null;
    this.input8 = null;
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
    this.initSub.unsubscribe();
  }
}
