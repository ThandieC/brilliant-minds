import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.reducer";
import * as authActions from "./store/auth.actions";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
    isLogingMode = true;
    isLoading = false;
    error: string = null;
    private storeSub: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.storeSub = this.store.select("auth").subscribe((authState) => {
            this.isLoading = authState.loading;
            this.error = authState.loggingError;
        });
    }

    onSwitchMode() {
        this.isLogingMode = !this.isLogingMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

        if (this.isLogingMode) {
            this.store.dispatch(
                new authActions.LoginStart({
                    email: email,
                    password: password,
                })
            );
        } else {
            this.store.dispatch(
                new authActions.SignupStart({
                    email: email,
                    password: password,
                })
            );
        }

        this.store.select("auth").subscribe((authState) => {
            this.error = authState.loggingError;
            console.log(this.error);
        });
        form.reset();
    }

    onHandleError() {
        this.store.dispatch(new authActions.ClearError());
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}
