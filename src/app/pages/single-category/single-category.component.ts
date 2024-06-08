import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent {
  postsArray: any;
  categoryObj
  constructor(private route: ActivatedRoute, private postService: PostsService) { }
  ngOnInit(): void {
    this.route.params.subscribe(val => {
      console.log("logging val")
      console.log(val);
      this.categoryObj = val;
      const id = val['category'];
      console.log(id);

      this.postService.loadSingleCategory(id).subscribe(post => {
        console.log("logging post");
        console.log(post);
        this.postsArray = post;
      })
    })
  }
}
