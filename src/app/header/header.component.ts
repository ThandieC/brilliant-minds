import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  navbarCollapsed = true;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .select('auth')
      .pipe(map((authState) => authState.user)) // remove curly braces and return statement to make statement inline because there is only 1 return statement and no other line of code.
      .subscribe((user) => {
        this.isAuthenticated = !!user; //  this is equal to   !user ? false : true;
      });
  }

  onToggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
