import {Category} from "./category";

export interface IMovie{
  id: string;
  title: string;
  description: string;

  is_top: boolean;
  age_limit: string;

  image: string;

  category: string;

}


