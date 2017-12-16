import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Router } from '@angular/router';
import { Post } from './post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PostsService]
})

export class AppComponent {

  blog: string = 'WP Angular Blog';

  posts: Post[];

  constructor( private postsService: PostsService ) {
  }

  getPosts(path, id) {
    this.postsService
      .getPosts(path, id)
      .subscribe(res => {
        this.posts = res;
      });
  }

  setPath(path, id) {
    this.postsService.setPath(path, id);
  }

  ngOnInit() {
    this.getPosts('home', '');
    this.postsService.setPath('random', '');
  }

}

