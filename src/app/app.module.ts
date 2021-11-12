import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

// 1 -> import something from Angular Material part 2 bellow
import { MatInputModule } from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {PostService} from "./posts/post.service";
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    //those here are only available to use inside our root component in our app
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // i need this to get directive [(ngModel)]
    FormsModule,
    BrowserAnimationsModule,

    // 2 -> import something from Angular Material
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],

  // this is for services
  //providers: [PostService],
  // either add services here or with @Injectable({}) on
  providers: [],

  // this is made available to index.html
  bootstrap: [AppComponent]
})
export class AppModule { }
