import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as MemoryActions from './store/memory.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css'],
})
export class MemoryComponent implements OnInit, OnDestroy {
  isPlaying = false;
  level: string;
  checked = false;
  success = false;
  showNext = false;
  randomNum: number;
  userNum: string;
  initSub: Subscription;
  storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  onSelectLevel(level: string) {
    this.level = level;
  }

  onNewNumber() {
    this.store.dispatch(
      new MemoryActions.CreateRandom({ selectedlevel: this.level })
    );
    this.initSub = this.store
      .select('memory')
      .pipe(
        map((numState) => {
          return numState;
        })
      )
      .subscribe((numState) => {
        this.randomNum = numState.randomNum;
        this.showNext = false;
        this.checked = false;
        this.isPlaying = false;
        this.resetBox();
        setTimeout(() => {
          this.isPlaying = true;
        }, 5000);
      });
  }

  onCheckBox() {
    this.store.dispatch(
      new MemoryActions.CompareNumbers({
        userNumber: +this.userNum,
      })
    );
    this.storeSub = this.store
      .select('memory')
      .pipe(
        map((numState) => {
          return numState;
        })
      )
      .subscribe((numState) => {
        if (numState.solved) {
          this.success = true;
          this.showNext = true;
          this.isPlaying = true;
        } else {
          this.success = false;
          this.showNext = false;
          this.isPlaying = false;
        }
        this.checked = true;
      });
  }

  resetBox() {
    this.userNum = null;
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
    this.initSub.unsubscribe();
  }
}
