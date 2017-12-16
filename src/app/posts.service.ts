import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/map';

import { Post } from './post';

@Injectable()
export class PostsService {

  // requires wp-api-custom-endpoints plugin to be installed and activated
  // https://github.com/tone4hook/wp-api-custom-endpoints
  private _wpBase = "http://yourwebsite.com/wp-json/wace/v2";

  private _postList = null;

  private _path: Array<string> = ['', ''];

  private _postId: string = '1';

  constructor(private http: Http) { }

  getPosts(path, id): Observable<Post[]> {
    if (path == 'random') {
      if (!this._postList) {
          this._postList = this.http
            .get(this._wpBase + '/' + path + '/' + id)
            .map((res: Response) => res.json()).publishReplay(1).refCount();
           return this._postList;
      } else {
        return this._postList;
      } // /if else
    } else if (path == 'search') {
      return this.http
        .get(this._wpBase + '/search='  + id)
        .map((res: Response) => res.json()).publishReplay(1).refCount();
    } else {
      return this.http
        .get(this._wpBase + '/' + path + '/' + id)
        .map((res: Response) => res.json()).publishReplay(1).refCount();
    } // /if else
  } // /getPosts

  setPost(id) {
    this._postId = id;
  }

  setPath(path, id) {
    this._path[0] = path;
    this._path[1] = id;
  }

  getPostId() {
    return this._postId;
  }

  getPath() {
    return this._path;
  }

}
