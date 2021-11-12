import {PostModel} from "./post.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from 'rxjs';
import {map, subscribeOn} from 'rxjs/operators';
import {response} from "express";


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


  getPost(id: string) {
    // this gets the post from the local array of posts,
    // this means we first have to visit the home page then come here
    // if we refresh this page we loose the state
    //return {...this.posts.find( p => p.id === id)};

    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string): void {
    const post: PostModel = {id: null, title: title, content: content};

    this.http.post<{message: string, postId: string}>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);

        // emit a values of my posts after I updated them
        this.postsUpdated.next([...this.posts]);
      })
  }

  updatePost(id: string, title: string, content: string) {
    const post: PostModel = {id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/posts' + id, post)
      .subscribe(response => {
        console.log(response);
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
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



