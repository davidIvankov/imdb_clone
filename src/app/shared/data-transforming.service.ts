import { Injectable } from "@angular/core";

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

   getVoteCount(votecount: number){ 
    if (votecount > 1000000){
      return `${votecount/1000000}M`
    } else if (votecount > 1000) {
      return `${votecount/1000}K`
    } else return `${votecount}`
  }

  getYear(date: string){
    return date.slice(0,4)
  }

   getTrailer(obj: object[]){
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

  getDirector(obj: object[]){
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

  getWriters(obj: object[]){
    let dirString: string[] = [];
    obj.forEach((member: object)=>{
      if (member['known_for_department'] === 'Writing'){
        if(!dirString.includes(member['name']))
        dirString.push(member['name'])
      }
    });

    return dirString
  }

  getActors(obj: object[]){
    let dirString: object[] = [];
    obj.forEach((member: object)=>{
      if (member['known_for_department'] === 'Acting'){
        dirString.push(member)
      }
    });
  
   return dirString.map(finalist=>finalist['name']).slice(0, 3)
  }

}