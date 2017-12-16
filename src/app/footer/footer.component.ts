import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private _d = new Date();

  private _n: number;

  @Input('blog') blogTitle: string;

  constructor() {}

  ngOnInit() {
    this._n = this._d.getFullYear();
  }

}
