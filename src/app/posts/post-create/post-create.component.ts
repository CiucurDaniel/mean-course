import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

    enteredTitle = '';
    enteredContent = '';

    // this decorator turns this Event into one which we can listen from outside
    @Output() postCreated = new EventEmitter();

    onAddPost(): void {
        const post = {
            title: this.enteredTitle, 
            content: this.enteredContent
        };

        this.postCreated.emit(post);
    }
}