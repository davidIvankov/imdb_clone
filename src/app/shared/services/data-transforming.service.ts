import { Injectable } from "@angular/core";
import { ChartItem } from "app/components/charts/chart-item.model";
import { ItemDetailes } from "app/components/titles/item-detailes.model";

@Injectable({providedIn: 'root'})

export class DataTransforming {

  public transformValues(res: object): ChartItem {
    return new ChartItem(
      res['title'] ? res['title']: res['name'],
      res['vote_average'],
      this.getYear(res),
      this.getPosterUrl(res['poster_path']),
      res['id'],
      res['title'] ? false : true
    );
  }

  public transformDetailedValues(res: object): ItemDetailes {
    return new ItemDetailes(
      res['title'] ? res['title'] : res['name'],
      res['vote_average'],
      this.getYear(res),
      this.getPosterUrl(res['poster_path']),
      this.getDuration(res),
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

  private getPosterUrl(poster: string) {
        return `https://image.tmdb.org/t/p/w500${poster}`
  }

  private getDuration(res){
    if (res['runtime']) {
      const minutes = res['runtime']

      const hours = Math.trunc(minutes/60);
      const left = minutes % 60;
      const mins = left
      return `${hours}h ${mins}m`
    } else {
      return res['last_air_date'].slice(0, 4);
    }

  }

  private getVoteCount(votecount: number){ 
    if (votecount > 1000000){
      return `${votecount/1000000}M`
    } else if (votecount > 1000) {
      return `${votecount/1000}K`
    } else return `${votecount}`
  }

  private getYear(obj: any){
    if (obj['release_date']) return obj['release_date'].slice(0,4) 
    if (obj['first_air_date']) return obj['first_air_date'].slice(0,4)
    else console.log(obj)
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