import {IMovie} from "./movie";

export interface MovieDetails{
  movie: IMovie,
  videos:Video[],
  images:{
    image:string;
  }[],
}

export interface Video{
  file: string;
}

export interface Image{
  file: string;
}
