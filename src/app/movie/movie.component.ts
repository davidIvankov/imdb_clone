import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  id: number;
  infoObject: object;
  constructor(private route: ActivatedRoute, private http: HttpClient){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fatchInfo(`https://api.themoviedb.org/3/movie/${this.id}?api_key=c3aceedbcd41c21bcb8db8c3d4adb97b&append_to_response=videos,images`)
    console.log(this.infoObject)
  }
   private fatchInfo(url: string){

  this.http
       .get(url)
      .subscribe(data=> {
        this.infoObject = data
        console.log(this.infoObject)
      })
}

}
