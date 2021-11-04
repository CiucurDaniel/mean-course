import {PostModel} from "./post.model";
import {Injectable} from "@angular/core";

import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();

  getPosts(): PostModel[] {
    return [...this.posts];
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }


  addPost(title: string, content: string): void {
    const post: PostModel = {title: title, content: content};
    this.posts.push(post);

    // emit a values of my posts after I updated them, next I need to listen to it
    this.postsUpdated.next([...this.posts]);
  }
}
