export interface MovieDetails{
  movie: {
    title: string;
    description: string;
    age_limit: string;
  },
  videos:{
    file: string;
  }[],

  images:{
    image:string;
  }[],
}
