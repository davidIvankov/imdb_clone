import { Injectable } from "@angular/core";
import { Movie } from "app/components/charts/movie.model";
import { MovieDetails } from "app/components/titles/movie-detailes.model";

@Injectable({providedIn: 'root'})

export class DataTransforming {
    getPosterUrl(poster: string) {
        return `https://image.tmdb.org/t/p/w500${poster}`
    }
     getDuration(minutes: number){
    const hours = Math.trunc(minutes/60);
    const left = minutes % 60;
    const mins = left
    return `${hours}h ${mins}m`
  }

  public transformValues(res: object): Movie {
    return new Movie(
      res['title'],
      res['vote_average'],
      this.getYear(res['release_date']),
      this.getPosterUrl(res['poster_path']),
      res['id']
    );
  }

  public transformDetailedValues(res: object): MovieDetails {
    return new MovieDetails(
      res['title'],
      res['vote_average'],
      this.getYear(res['release_date']),
      this.getPosterUrl(res['poster_path']),
      this.getDuration(res['runtime']),
      this.getVoteCount(res['vote_count']),
      this.getTrailer(res['videos']['results']),
      this.getWriters(res['credits']['crew']),
      res['popularity'],
      res['genres'],
      res['overview'],
      this.getActors(res['credits']['cast']),
      this.getDirector(res['credits']['crew'])
    );
  }

  private getVoteCount(votecount: number){ 
    if (votecount > 1000000){
      return `${votecount/1000000}M`
    } else if (votecount > 1000) {
      return `${votecount/1000}K`
    } else return `${votecount}`
  }

  private getYear(date: string){
    return date.slice(0,4)
  }

  private getTrailer(obj: object[]){
    let videoUrl: string; 
    obj.forEach(video=>{
      let find;
      if (video['type'] === 'Trailer' && find === undefined) {
        if (video['site'] === 'YouTube'){
          videoUrl = `https://www.youtube.com/embed/${video['key']}`
        find = true
        } else {
          videoUrl = `https://vimeo.com/${video['key']}`
          find = true
        } 
      } else return
    })
    return videoUrl
  }

  private getDirector(obj: object[]){
    let director: string;
    let dirString: object[] = [];
    let num: number = 0;
    obj.forEach((member: object)=>{
      if (member['known_for_department'] === 'Directing'){
        dirString.push(member)
      }
    });
    dirString.forEach(dir=>{
       if (dir['popularity'] > num){
        director = dir['name'];
        num = dir['popularity']
      } else  return
    })
    return director
  }

  private getWriters(obj: object[]){
    let dirString: string[] = [];
    obj.forEach((member: object)=>{
      if (member['known_for_department'] === 'Writing'){
        if(!dirString.includes(member['name']))
        dirString.push(member['name'])
      }
    });
    return dirString
  }

  private getActors(obj: object[]){
    let dirString: object[] = [];
    obj.forEach((member: object)=>{
      if (member['known_for_department'] === 'Acting'){
        dirString.push(member)
      }
    });
   return dirString.map(finalist=>finalist['name']).slice(0, 3)
  }
}