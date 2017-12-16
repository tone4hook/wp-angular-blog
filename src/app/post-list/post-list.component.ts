import { Component, OnInit} from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { PostSingleComponent } from '../post-single/post-single.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: []
})
export class PostListComponent implements OnInit {

  posts: Post[];
  private _path: Array<string>;

  constructor( private postsService: PostsService, private router: Router ) {}

  addRoutePaths(type, path) {
    switch (type) {
      case 'post':
        console.log('added route');
        this.router.config.unshift({ path: path, component: PostSingleComponent, pathMatch: 'full' });
      break;

      case 'posts':
        this.router.config.unshift({ path: path, component: PostListComponent, pathMatch: 'full' });
      break;

      default:
        this.router.config.unshift({ path: path, component: PostListComponent, pathMatch: 'full' });
    }

  }

  getPosts(path, id) {
    this.postsService
      .getPosts(path, id)
      .subscribe(res => {
        this.posts = res;
      });
  }

  selectPost(slug, id) {
    this.postsService.setPost(id);
    let path = 'article/' + slug;
    this.addRoutePaths('post', path);
    console.log('select post');
    this.router.navigate([path]);
  }

  navTo(path, slug, id) {
    this.postsService.setPath(path, id);
    this.router.navigate([slug]);
  }

  ngOnInit() {
    this._path = this.postsService.getPath();
    this.getPosts(this._path[0], this._path[1]);
  }

}
