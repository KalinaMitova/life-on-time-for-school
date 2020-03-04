import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Post } from 'app/shared/models/post';

@Component( {
  selector: 'app-card-video',
  templateUrl: './card-video.component.html',
  styleUrls: [ './card-video.component.scss' ],
  encapsulation: ViewEncapsulation.None
} )
export class CardVideoComponent implements OnInit {
  @Input( 'post' ) post: Post;

  constructor () { }

  ngOnInit() {
  }

}
