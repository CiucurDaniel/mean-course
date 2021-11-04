import {PostModel} from "./post.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from 'rxjs';


@Injectable({providedIn: 'root'})
export class PostService {
  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();


  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: PostModel[]}>('http://localhost:3000/api/posts')
      .subscribe( (postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }


  addPost(title: string, content: string): void {
    const post: PostModel = {id: null, title: title, content: content};
    this.posts.push(post);

    // emit a values of my posts after I updated them, next I need to listen to it
    this.postsUpdated.next([...this.posts]);
  }
}







