import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as AdditionActions from './store/addition.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-addition',
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css'],
})
export class AdditionComponent implements OnInit, OnDestroy {
  checked = false;
  success = false;
  showNext = false;
  num1: number;
  num2: number;
  num3: number;
  total: string;
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
  initSub: Subscription;
  storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.total = '15';
    this.onNewBox();
  }

  onNewBox() {
    this.store.dispatch(new AdditionActions.NewBox());
    this.initSub = this.store
      .select('addition')
      .pipe(
        map((numState) => {
          return numState;
        })
      )
      .subscribe((numState) => {
        this.num1 = numState.number1;
        this.num2 = numState.number2;
        this.num3 = numState.number3;
        this.resetBox();
        this.showNext = false;
        this.checked = false;
      });
  }

  onCheckBox() {
    this.store.dispatch(
      new AdditionActions.AddBox({
        num1: +this.input1,
        num2: +this.input2,
        num3: +this.input3,
        num4: +this.input4,
        num5: +this.input5,
        num6: +this.input6,
        total: +this.total,
      })
    );
    this.storeSub = this.store
      .select('addition')
      .pipe(
        map((numState) => {
          return numState;
        })
      )
      .subscribe((numState) => {
        if (numState.solved) {
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
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
    this.initSub.unsubscribe();
  }
}
