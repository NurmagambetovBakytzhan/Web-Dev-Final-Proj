import {Component, OnInit} from '@angular/core';
import {MovieDetails} from "../../models/movieDetails";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../models/category";
import {MovieService} from "../../services/movie.service";
import {FormBuilder, FormGroup} from "@angular/forms";

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

  formUpdateMovie !: FormGroup;

  constructor(private authService: AuthService,
              public router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private movieService: MovieService,) {
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

    this.formUpdateMovie = this.formBuilder.group({
      title: "",
      description: "",
      age_choises: "",
      image: null,
      category: "",
    });

  }


  onSubmit() {
    const formData = new FormData();

    formData.append('title', this.formUpdateMovie.value.title);
    formData.append('description', this.formUpdateMovie.value.description);
    formData.append('image', this.formUpdateMovie.value.image);
    formData.append('category', this.formUpdateMovie.value.category);

    this.movieService.updateMovie(this.movieId,formData).subscribe(()=>{
      this.router.navigate(['/movies', this.movieId])
    })
  }

  onCoverImageSelect(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.formUpdateMovie.patchValue({image: file})
      // this.formMovie.controls['cover_image'].setValue(file);
    }
  }

}
