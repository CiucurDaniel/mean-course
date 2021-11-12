import {Component, OnInit} from "@angular/core";

import {NgForm} from "@angular/forms";
import {PostService} from "../post.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {PostModel} from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  public post: PostModel;

  constructor(public postService: PostService, public route: ActivatedRoute) {
  }

  onSavePost(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        // im in edit mode
        this.mode = 'edit';

        // get the post id from the params of the route
        this.postId = paramMap.get('postId');

        //store the post
        this.postService.getPost(this.postId).subscribe( postData => {
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}
