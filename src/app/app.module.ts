import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GenreCardComponent } from './genre-card/genre-card.component';
import { DirectorCardComponent } from './director-card/director-card.component';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SynopsisCardComponent } from './synopsis-card/synopsis-card.component';



const appRoutes: Routes = [
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'movies', component: MovieCardComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
  ];

@NgModule({
declarations: [
AppComponent,
UserRegistrationFormComponent,
UserLoginFormComponent,
MovieCardComponent,
WelcomePageComponent,
UserProfileComponent,
GenreCardComponent,
DirectorCardComponent,
EditProfileFormComponent,
NavigationComponent,
SynopsisCardComponent
],
imports: [
BrowserModule,
AppRoutingModule,
BrowserAnimationsModule,
MatCardModule,
MatFormFieldModule,
MatDialogModule,
FormsModule,
HttpClientModule,
MatSnackBarModule,
MatInputModule,
MatButtonModule,
MatIconModule,
RouterModule.forRoot(appRoutes)
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }