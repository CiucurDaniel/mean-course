import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostCreateComponent} from "./posts/post-create/post-create.component";

/*
This will become an Angular module.
Modules are what Angular analyses to see what features your app uses
 */


const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreateComponent},
  {path: 'edit/:postId', component: PostCreateComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
