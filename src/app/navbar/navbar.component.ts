import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { PostListComponent } from '../post-list/post-list.component';
import { PostSingleComponent } from '../post-single/post-single.component';
import { Post } from '../post';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input('blog') blogTitle: string;

  @Input('posts') posts: Post[];

  private in: boolean = false;

  constructor( private postsService: PostsService, private router: Router ) {}

  ngOnInit() {}

  addRoutePaths(type, path) {
    switch (type) {
      case 'post':
        this.router.config.unshift({ path: path, component: PostSingleComponent, pathMatch: 'full' });
      break;

      case 'posts':
        this.router.config.unshift({ path: path, component: PostListComponent, pathMatch: 'full' });
      break;

      default:
        this.router.config.unshift({ path: path, component: PostListComponent, pathMatch: 'full' });
    }

  }

  setPath(path, id) {
    this.postsService.setPath(path, id);
  }

  navbarToggle(event) {

    console.log(event);

    this.in = !this.in;

  }

}
