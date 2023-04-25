import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {VerifyRegistrationComponent} from "./components/verify-registration/verify-registration.component";
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {AuthInterceptor} from './AuthInterceptor';
import {MovieDetailsChangeComponent} from './components/movie-details-change/movie-details-change.component';
import {CreateMovieComponent} from './components/create-movie/create-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MovieListComponent,
    VerifyRegistrationComponent,
    MovieDetailsComponent,
    TopBarComponent,
    MovieDetailsChangeComponent,
    CreateMovieComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'movies', component: MovieListComponent},
      {path: 'create-movie', component: CreateMovieComponent},
      {path: 'movies/:id', component: MovieDetailsComponent},
      {path: 'movies/:id/change', component: MovieDetailsChangeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'verify-registration', component: VerifyRegistrationComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},

    ]),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
