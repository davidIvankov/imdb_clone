import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit{
  id: number;
  infoObject: object;
  duration: string;
  vote_count: string;
  posterSrc: string;
  posterAlt: string;
  videoUrl: string;
  director: string;
  writers: string[];
  actors: string[];
  height: number;

 
  private changes: MutationObserver;

  
  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fatchInfo(`https://api.themoviedb.org/3/movie/${this.id}?api_key=c3aceedbcd41c21bcb8db8c3d4adb97b&append_to_response=videos,images,credits`)
    console.log(this.infoObject)
  }
  ngAfterViewInit(): void {
    this.changes = new MutationObserver(()=>{
      if (this.myReference){
      this.height = this.myReference.nativeElement.offsetHeight
      }
    })
    this.changes.observe(document.querySelector('.element'),{
      attributes: true,
      childList: true,
      characterData: true
    })

   
  }
  
   private fatchInfo(url: string){

  this.http
       .get(url)
      .subscribe(data=> {
        this.infoObject = data
        this.duration = this.getDuration(this.infoObject['runtime'])
        this.vote_count = this.getVoteCount(this.infoObject['vote_count'])
        this.posterSrc= `https://image.tmdb.org/t/p/original${this.infoObject['poster_path']}`
        this.posterAlt = `${this.infoObject['title']} poster`
        this.videoUrl = this.getTrailer(this.infoObject);
        this.director = this.getDirector(this.infoObject);
        this.writers = this.getWriters(this.infoObject);
        this.actors = this.getActors(this.infoObject)
        this.titleService.setTitle(`${this.infoObject['title']}(${this.infoObject['release_date'].slice(0,4)})-IMDb`)


        
        console.log(this.infoObject)
      })
}
  private getDuration(minutes: number){
    const hours = Math.trunc(minutes/60);
    const left = minutes % 60;
    const mins = left
    return `${hours}h ${mins}m`

  }
  private getVoteCount(votecount: number){ 
    if (votecount > 1000000){
      return `${votecount/1000000}M`
    } else if (votecount > 1000) {
      return `${votecount/1000}K`
    } else return `${votecount}`
  }

  private getTrailer(obj: object){
    let videoUrl: string; 
    obj['videos']['results'].forEach(video=>{
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

  private getDirector(obj: object){
    let director: string;
    let dirString: object[] = [];
    let num: number = 0;
    obj['credits']['crew'].forEach((member: object)=>{
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

  private getWriters(obj: object){
    let dirString: string[] = [];
    obj['credits']['crew'].forEach((member: object)=>{
      if (member['known_for_department'] === 'Writing'){
        if(!dirString.includes(member['name']))
        dirString.push(member['name'])
      }
    });

    return dirString
  }

  private getActors(obj: object){
    let dirString: object[] = [];
    obj['credits']['cast'].forEach((member: object)=>{
      if (member['known_for_department'] === 'Acting'){
        dirString.push(member)
      }
    });
  
   return dirString.map(finalist=>finalist['name']).slice(0, 3)
  }
   @ViewChild('myReference')
   myReference: ElementRef;

}
