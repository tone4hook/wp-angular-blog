import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { PostListComponent } from '../post-list/post-list.component';
import { PostSingleComponent } from '../post-single/post-single.component';
import { Post } from '../post';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input('posts') posts: Post[];

  search: string = '';

  constructor( private postsService: PostsService, private router: Router ) {
  }

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

  selectPost(slug, id) {
    this.postsService.setPost(id);
    let path = 'article/' + slug;
    this.addRoutePaths('post', path);
    this.router.navigate([path]);
  }

  searchSubmit(str: string) {
    if ( !( (!str || 0 === str.length) || (!str || /^\s*$/.test(str)) ) ) {
      this.search = str.replace(/\s+/g, '-').toLowerCase();
      let path = 'search/' + this.search;
      this.addRoutePaths('posts', path);
      this.postsService.setPath('search', this.search);
      this.router.navigate([path]);
    }
  }

}
