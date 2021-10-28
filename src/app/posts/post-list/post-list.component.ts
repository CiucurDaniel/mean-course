import { Component } from "@angular/core";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
    /* posts = [
        {title: 'First post', content: "This is the first's post content."},
        {title: 'Second post', content: "This is the second's post content."},
        {title: 'Third post', content: "This is the third's post content."}
    ] */

    posts = []
}