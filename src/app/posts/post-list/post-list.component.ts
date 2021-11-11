import {Component, OnDestroy, OnInit} from "@angular/core";
import {PostModel} from "../post.model";
import {PostService} from "../post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  /* posts = [
      {title: 'First post', content: "This is the first's post content."},
      {title: 'Second post', content: "This is the second's post content."},
      {title: 'Third post', content: "This is the third's post content."}
  ] */

  posts: PostModel[] = [];
  private postSubscription: Subscription;

  constructor(public postService: PostService) {
  }

  // recommended to do basic initialization tasks in onInit
  ngOnInit() {
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostUpdateListener()
      .subscribe( (posts: PostModel[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string){
    this.postService.deletePost(postId);
  }
  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

}
