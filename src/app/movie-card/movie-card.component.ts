import { Component, OnInit } from '@angular/core';
// Used to access various functions created on the service that are needed by this component
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { Router } from '@angular/router';

@Component({
 selector: 'app-movie-card',
 templateUrl: './movie-card.component.html',
 styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
 
 username: any = localStorage.getItem('user');
 currentUser: any = null;
 movies: any[] = [];
 favourites: any[] = [];
 isInFavs: boolean = false;

 constructor(
   public fetchApiData: FetchApiDataService, 
   public dialog: MatDialog, 
   public router: Router,
   public snackBar: MatSnackBar
 ) { }

 /**
  * Calls the getMovies and getFavouriteMovies methods as soon as the component loads so that 
  * the data can be used to populate the template.
  */ 
 ngOnInit(): void { 
   this.getMovies(); 
   this.getFavouriteMovies();
   this.getCurrentUser(this.username);

 }

 getCurrentUser(username: string): void {
  this.fetchApiData.getUser(username).subscribe((resp: any) => {
    this.currentUser = resp;
    this.favourites = resp.FavoriteMovies;
    return (this.currentUser, this.favourites);
  });
}


 /** 
  * Invokes the getAllMovies method on the fetchApiData service and populates the movies array with
  * the response. 
  */ 
 getMovies(): void {
   this.fetchApiData.getAllMovies().subscribe((resp: any) => { this.movies = resp });
 }

 /** 
  * Invokes the getUser method on the fetchApiData service and populates the favourites array with
  * the favouriteMovies property on the response, which is an array of the user's favourite movies. 
  */
 getFavouriteMovies(): void {
   this.fetchApiData.getUser(this.username).subscribe((resp: any) => { this.favourites = resp.FavoriteMovies
   });
 }

 /** 
  * Extracts the IDs of the user's favourite movies and checks to see if the movie selected is 
  * included. Returns a specified theme colour value depending on whether the result is true or false. 
  * @param movieID ID of the movie selected.
  * @returns String value for the colour used to style the mat-icon-button in the template that
  * renders the heart icon on the movie's mat card.
  */ 
 toggleHeart(movieID: string): string {
   let movieIds = this.favourites.map(favourite => { return favourite._id });
   return movieIds.includes(movieID) ? 'warn' : 'accent';
 }


 /**
  * Opens a dialog to display the genre component, passing it the data it needs to display
  * genre information inside the data object.
  * @param name Name of the genre for the movie selected.
  * @param description Description of the genre.
  */
 openGenreDialog(name: string, description: string): void {
   this.dialog.open(GenreCardComponent, {
     data: { name: name, description: description },
     width: '250px' 
   });
 } 

 
 logOut(): void {
  this.router.navigate(['welcome']);
  localStorage.clear();
}

openProfile(): void {
  this.router.navigate(['profile']);
}

favCheck(movieId: string): any {
  console.log(this.favourites);
  if (this.favourites.includes(movieId)) {
    this.isInFavs = true;
    return this.isInFavs;
  };
}

toggleFavs(movieId: string): void {
  if (this.favourites.filter(function (e: any) { return e._id === movieId; }).length > 0) {
    this.removeFromFavs(movieId);
    this.isInFavs = false;
  } else {
    this.addToFavs(movieId)
    this.isInFavs = true;
  }
}

addToFavs(movieId: string): void {
  //checking if the title is already in favs
  if (this.favourites.filter(function (e: any) { return e._id === movieId; }).length > 0) {
    this.snackBar.open('Already in your favs', 'OK', { duration: 2000 });
    return
  } else {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp: any) => {
      this.getCurrentUser(this.username);
      this.ngOnInit();
      this.snackBar.open('Added to favs', 'OK', { duration: 2000 });
    });
  }
}

removeFromFavs(MovieID: any): void {
  this.fetchApiData.deleteFavoriteMovie(MovieID).subscribe((resp: any) => {
    this.snackBar.open('Removed from favs', 'OK', { duration: 2000 });
    this.getCurrentUser(this.username);
    this.ngOnInit();
    2000
  });
}


 /**
  * Opens a dialog to display the director component, passing it the data it needs to display
  * information about the director inside the data object.
  * @param name Name of the director of the movie selected.
  * @param bio Biography of the director.
  * @param birth Year of birth of the director.
  * @param death Year of death of the director.
  */
 openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
   this.dialog.open(DirectorCardComponent, {
     data: { name: name, bio: bio, birth: birth, death: death },
     width: '250px' 
   });
 }

 /**
  * Opens a dialog to display the synopsis component, passing it the data it needs to display a
  * synopsis of the movie within the data object.
  * @param title Title of the movie selected.
  * @param description Synopsis of the movie.
  */
 openSynopsisDialog(title: string, description: string): void {
   this.dialog.open(SynopsisCardComponent, {
     data: { title: title, description: description },
     width: '250px' 
   });
 }
}

