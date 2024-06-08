import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {
  postData: any
  isLoading: boolean = true
  constructor(private route: ActivatedRoute, private postservice: PostsService) { }
  similarPostArray: Array<object>;
  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.postservice.loadOnePost(val['id']).subscribe(post => {
        console.log(post);
        this.postData = post
        this.loadSimilarPost(this.postData.category.category);
        this.isLoading = false
      })
    })
  }

  loadSimilarPost(cat) {
    this.postservice.loadSimilar(cat).subscribe(val => {
      console.log("logging loadsimilar array");
      this.similarPostArray = val
    })
  }
}
