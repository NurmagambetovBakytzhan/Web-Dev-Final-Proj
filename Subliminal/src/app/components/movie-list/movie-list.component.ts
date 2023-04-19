import {Component, OnInit} from '@angular/core';
import {IMovie} from "../../models/movie";
import {MovieService} from "../../services/movie.service";
import {catchError, of} from "rxjs";
import {AuthToken} from "../../models/authToken";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  movies: IMovie[] | undefined;

  constructor(private movieService: MovieService,private router: Router, public authService: AuthService) {}

  ngOnInit() {
    const token: string | null = localStorage.getItem('access_token');
    if (token){
      this.authService.is_authenticated = true;
      this.movieService.getMovies().subscribe(
        (movies: IMovie[]) =>{
          this.movies = movies;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }



  goToVideoDetails(movieId: string){
    this.router.navigate(['/movies', movieId])
  }
}
