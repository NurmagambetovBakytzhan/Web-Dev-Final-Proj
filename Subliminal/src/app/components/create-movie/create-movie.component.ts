import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../models/category";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  formMovie !: FormGroup;

  categories_all!: Category[];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private movieService: MovieService,
              private route: ActivatedRoute,
              private http: HttpClient,
              private authService: AuthService,
  ) {
  }


  ngOnInit() {
    this.formMovie = this.formBuilder.group({
      title: "",
      description: "",
      age_choises: "",
      image: null,
      category: "",
    });

    this.http.get<Category[]>(`${this.authService.URL}/categories/`).subscribe(
      response => {
        this.categories_all = response;
      },
      error => {

        console.log(error)
      }
    )
  }

  onCoverImageSelect(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.formMovie.patchValue({image: file})
      // this.formMovie.controls['cover_image'].setValue(file);
    }
  }

  onSubmit() {
    const user_id = this.route.snapshot.queryParamMap.get('id')


    // this.formMovie.patchValue({
    //   categories: selectedCategories
    // });

    const formData = new FormData();
    formData.append('title', this.formMovie.value.title);
    formData.append('description', this.formMovie.value.description);
    formData.append('image', this.formMovie.value.image);
    formData.append('category', this.formMovie.value.category);
    console.log(this.formMovie.getRawValue())
    console.log(this.categories_all)
    this.movieService.createMovie(formData).subscribe(() => {
      this.router.navigate(['/movies'])
    });
  }




}
