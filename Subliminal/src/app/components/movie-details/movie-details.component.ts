import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MovieDetails} from "../../models/movieDetails";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{
  movieDetails: MovieDetails | undefined;

  constructor(public route: ActivatedRoute,
              private http: HttpClient,
              public authService: AuthService,
              public userService: UserService,
              public movieService: MovieService,
              public router: Router) {}
  movieId = this.route.snapshot.paramMap.get('id');
  ngOnInit() {
    const url = `${this.authService.URL}/movies/${this.movieId}/details`;

    this.http.get<MovieDetails>(url).subscribe(
      response => {
        this.movieDetails = response;
      },
      error => {
        console.log(error)
      }
    );
  }

  toChange(){
    this.router.navigate(['/movies', this.movieId,'change']);
  }

  deleteMovie(){
    this.movieService.deleteMovie(this.movieId)
    this.router.navigate(['/movies'])
  }
}
