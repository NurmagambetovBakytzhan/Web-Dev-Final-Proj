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
export class CreateMovieComponent implements OnInit{
  formMovie !: FormGroup;

  categories!: Category[];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private movieService:MovieService,
              private route: ActivatedRoute,
              private http: HttpClient,

              private authService: AuthService,

  ) {}


  ngOnInit() {
    this.formMovie = this.formBuilder.group({
      author:"",
      title:"",
      description:"",
      age_choises:"",
      cover_image: null,
      categories: [],


    });

    this.http.get<Category[]>(`${this.authService.URL}/categories/`).subscribe(
      response => {
        this.categories = response;
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
      // this.formMovie.controls['cover_image'].setValue(file);
    }
  }

  onSubmit() {
    const user_id = this.route.snapshot.queryParamMap.get('id')
    const selectedCategories = this.formMovie.value.categories.map((category: any) => category.id);


    this.formMovie.patchValue({
      author: user_id,
      categories: selectedCategories
    });

    const formData = new FormData();
    formData.append('title', this.formMovie.value.title);
    formData.append('description', this.formMovie.value.description);
    // @ts-ignore
    // formData.append('cover_image', this.formMovie.get('cover_image').value);
    formData.append('cover_image', this.formMovie.value.cover_image);
    formData.append('categories', JSON.stringify(selectedCategories));
    console.log(selectedCategories)
    this.movieService.createMovie(formData).subscribe(() => {
      this.router.navigate(['/movies'])
    });
  }


}
