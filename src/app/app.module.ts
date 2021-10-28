import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

// 1 -> import something from Angular Material part 2 bellow
import { MatInputModule } from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    //those here are only available to use inside our root component in our app
    AppComponent,
    PostCreateComponent
  ],
  imports: [
    BrowserModule,
    // i need this to get directive [(ngModel)]
    FormsModule,
    BrowserAnimationsModule,

    // 2 -> import something from Angular Material
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],

  // this is made available to index.html
  bootstrap: [AppComponent]
})
export class AppModule { }
