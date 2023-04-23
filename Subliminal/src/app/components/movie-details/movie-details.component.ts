import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MovieDetails} from "../../models/movieDetails";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{
  movieDetails: MovieDetails | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient, public authService: AuthService) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    const url = `http://127.0.0.1:8000/api/v1/movies/${movieId}/details`;

    this.http.get<MovieDetails>(url).subscribe(
      response => {
        this.movieDetails = response;
      },
      error => {
        console.log(error)
      }
    );
  }
}
