import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { environment } from "../../../environments/environment";

import * as AuthActions from "./auth.actions";
import { User } from "../user.model";
import { AuthService } from "../auth.service";
import * as fromApp from "../../store/app.reducer";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (
    email: string,
    userId: string,
    token: string,
    expiresIn: number
) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const newUser = new User(email, userId, token, expirationDate);
    localStorage.setItem("userData", JSON.stringify(newUser));

    return new AuthActions.AuthenticationSuccess({
        email: email,
        id: userId,
        token: token,
        expirationDate: expirationDate,
        redirect: true,
    });
};

const handleError = (errorRes: any) => {
    let errorMessage = "Something's not right! Please try again!";
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticationFail(errorMessage));
    }
    switch (errorRes.error.error.message) {
        case "EMAIL_EXISTS":
            errorMessage = "This email already exists! Try another one!";
            break;
        case "EMAIL_NOT_FOUND":
            errorMessage = "Your Email or Password is incorrect!";
            break;
        case "INVALID_PASSWORD":
            errorMessage = "Your Email or Password is incorrect!";
    }
    return of(new AuthActions.AuthenticationFail(errorMessage));
};

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authData: AuthActions.SignupStart) => {
            return this.http
                .post<AuthResponseData>(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
                        environment.firebaseAPIKey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true,
                    }
                )
                .pipe(
                    tap((resData) => {
                        this.authService.setLogoutTimer(
                            +resData.expiresIn * 100
                        );
                    }),
                    map((resData) => {
                        return handleAuthentication(
                            resData.email,
                            resData.localId,
                            resData.idToken,
                            +resData.expiresIn
                        );
                    }),
                    catchError((errorRes) => {
                        return handleError(errorRes);
                    })
                );
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                .post<AuthResponseData>(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
                        environment.firebaseAPIKey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true,
                    }
                )
                .pipe(
                    tap((resData) => {
                        this.authService.setLogoutTimer(
                            +resData.expiresIn * 1000
                        );
                    }),
                    map((resData) => {
                        return handleAuthentication(
                            resData.email,
                            resData.localId,
                            resData.idToken,
                            +resData.expiresIn
                        );
                    }),
                    catchError((errorRes) => {
                        return handleError(errorRes);
                    })
                );
        })
    );

    @Effect()
    authAutoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem("userData"));
            if (!userData) {
                return { type: "DUMMY" };
            }

            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );

            if (loadedUser.token) {
                const expirationTimeLeft =
                    new Date(userData._tokenExpirationDate).getTime() -
                    new Date().getTime();
                this.authService.setLogoutTimer(expirationTimeLeft);

                return new AuthActions.AuthenticationSuccess({
                    email: loadedUser.email,
                    id: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate),
                    redirect: false,
                });
            }
            return { type: "DUMMY" };
        })
    );

    @Effect({ dispatch: false })
    authAutoLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            localStorage.removeItem("userData");
            this.authService.clearLogoutTimer();
            this.router.navigate(["/home"]);
        })
    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATION_SUCCESS),
        tap((authSuccessData: AuthActions.AuthenticationSuccess) => {
            if (authSuccessData.payload.redirect) {
                this.router.navigate(["/landing"]);
            }
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) {}
}
