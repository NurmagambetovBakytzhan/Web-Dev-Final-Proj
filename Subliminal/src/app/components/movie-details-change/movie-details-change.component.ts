import {Component, OnInit} from '@angular/core';
import {MovieDetails} from "../../models/movieDetails";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../models/category";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-movie-details-change',
  templateUrl: './movie-details-change.component.html',
  styleUrls: ['./movie-details-change.component.css']
})
export class MovieDetailsChangeComponent implements OnInit {

  movieDetails: MovieDetails | undefined;
  categories: Category[] | undefined;
  updateSuccessMessage: string | undefined;
  updateErrorMessage: string | undefined;
  constructor(private authService: AuthService, public router: Router, private route: ActivatedRoute, private http: HttpClient, private movieService: MovieService) {
  }

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
    const categoryURL = `${this.authService.URL}/categories/`;
    this.http.get<Category[]>(categoryURL).subscribe(
      response => {
        this.categories = response;
      },
      error => {
        console.log(error)
      }
    )

  }

  onSubmit() {
    const formData = new FormData();
    // @ts-ignore
    formData.append('title', this.movieDetails.movie.title);
    // @ts-ignore
    formData.append('description', this.movieDetails.movie.description);
    // @ts-ignore
    formData.append('is_top', this.movieDetails.movie.is_top);
    // @ts-ignore
    formData.append('categories', this.movieDetails.movie.categories.join(','));

    const coverImage = document.getElementById('coverImage') as HTMLInputElement;
    // @ts-ignore
    if(coverImage.files.length > 0){
      // @ts-ignore
      formData.append('cover_image',coverImage.files[0]);
    }

    // @ts-ignore
    this.movieService.updateMovie(this.movieDetails.movie.id, formData).subscribe(
      response=>{
        console.log("Success!")
      },
      error =>{
        console.log("Error occured")
      }
    );
  }
  updateMovie() {
    // @ts-ignore
    this.movieService.updateMovie(this.movieDetails.movie).subscribe(
      () => {
        this.updateSuccessMessage = 'Movie successfully updated!';
        this.updateErrorMessage = '';
      },
      (error) => {
        this.updateSuccessMessage = '';
        this.updateErrorMessage = `Error updating movie: ${error.message}`;
      }
    );
  }

  // @ts-ignore
  onCoverImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // @ts-ignore
      this.movieDetails.movie.cover_image = reader.result.toString();
    }
    reader.readAsDataURL(file);
  }

}
