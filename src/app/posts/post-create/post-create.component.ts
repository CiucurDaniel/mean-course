import { Component, EventEmitter, Output } from "@angular/core";

import {PostModel} from "../post.model";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

    enteredTitle = '';
    enteredContent = '';

    // this decorator turns this Event into one which we can listen from outside
    @Output() postCreated = new EventEmitter<PostModel>();

    onAddPost(): void {
        const post: PostModel = {
            title: this.enteredTitle,
            content: this.enteredContent
        };

        this.postCreated.emit(post);
    }
}
