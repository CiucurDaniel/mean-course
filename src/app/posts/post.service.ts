import {PostModel} from "./post.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostService {
  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();


  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map( (postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe( transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }


  /*
  Error was here, look, on the client side when we save a post we set id to null
  we need after we subscribe to get back the id that Mongo gave to our post and add it to our current locall list
  of posts
   */
  addPost(title: string, content: string): void {
    const post: PostModel = {id: null, title: title, content: content};

    this.http.post<{message: string}>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);

        // emit a values of my posts after I updated them
        this.postsUpdated.next([...this.posts]);
      })
  }

  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe( () => {
        const updatedPosts = this.posts.filter( post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      })
  }
}



