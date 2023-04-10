import {Component, OnInit} from '@angular/core';
import {IMovie} from "../../models/movie";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit{
  constructor(private movieService: MovieService) {}
  movies!: IMovie[];
  ngOnInit() {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
    });
  }


}
