import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import * as fromApp from './store/app.reducer';
import { FooterComponent } from './footer/footer.component';
import { AuthEffects } from './auth/store/auth.effects';

var firebaseConfig = {
  apiKey: 'AIzaSyAfZzWWs4pOiBgq0CocV6seE3mDkbyicTU',
  authDomain: 'brilliant-minds-app.firebaseapp.com',
  projectId: 'brilliant-minds-app',
  storageBucket: 'brilliant-minds-app.appspot.com',
  messagingSenderId: '716394966274',
  appId: '1:716394966274:web:0e59081974757f54d6e61b',
  measurementId: 'G-TXQHCVGGQ0',
};

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRouterModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
