import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  FeaturedArray:Array<object>
  LatestArray:Array<object>
  isLoading:boolean = true;
constructor(private postservice:PostsService){

}
ngOnInit(){
  this.postservice.loadFetured().subscribe(val=>{
    console.log(val);
    
    this.FeaturedArray = val
    this.isLoading= false
  })

  this.postservice.loadLatest().subscribe(val=>{
 this.LatestArray = val;
  })
}
}
