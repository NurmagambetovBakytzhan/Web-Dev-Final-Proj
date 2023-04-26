import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MovieDetails} from "../../models/movieDetails";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {MovieService} from "../../services/movie.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{

  formVideo !: FormGroup;

  movieDetails: MovieDetails | undefined;

  addVideoButton = false;

  addImageButton = false;

  constructor(public route: ActivatedRoute,
              private http: HttpClient,
              public authService: AuthService,
              private formBuilder: FormBuilder,
              public userService: UserService,
              public movieService: MovieService,
              public router: Router) {}
  movieId = this.route.snapshot.paramMap.get('id');

  ngOnInit() {

    this.formVideo = this.formBuilder.group({
      title: "",
      file: null,
      movie:"",
    });
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

  addVideo(){
    this.addVideoButton = !this.addVideoButton;
  }

  addImage(){
    this.addImageButton = !this.addImageButton;
  }

  onVideoSelect(event:any){
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.formVideo.patchValue({file: file})
      // this.formMovie.controls['cover_image'].setValue(file);
    }
  }

  addVideoToMovie(){

    const formData = new FormData();
    // @ts-ignore
    formData.append('movie', this.movieId);
    formData.append('title', this.formVideo.value.title);
    formData.append('file', this.formVideo.value.file);
    this.movieService.createVideos(formData).subscribe(() => {
      this.addVideoButton = !this.addVideoButton;
    });

  }

  addImageToMovie(){
    const formData = new FormData();
    // @ts-ignore
    formData.append('movie', this.movieId);
    formData.append('file', this.formVideo.value.file);

    console.log(this.formVideo.value.file)
    this.movieService.createImage(formData).subscribe(() => {
      this.addImageButton = !this.addImageButton
    });
  }


}
