import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})
export class PostSingleComponent implements OnInit {

  posts: Post[];

  private _postId: string = '';

  constructor( private postsService: PostsService, private router: Router ) { }

  getPost(id) {
    this.postsService
      .getPosts('post', id)
      .subscribe(res => {
        this.posts = res;
      });
  }

  ngOnInit() {
    console.log('post oninit');
    this._postId = this.postsService.getPostId();
    this.getPost(this._postId);
  }

}

