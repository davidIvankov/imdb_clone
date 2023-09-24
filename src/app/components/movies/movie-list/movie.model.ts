import { DataTransforming } from '../../../shared/services/data-transforming.service';

export class Movie {
  constructor(
    public title: string,
    public vote: number,
    public date: string,
    public poster: string,
    public id: number
  ) {}
}
