import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'app/shared/models/post';

@Component( {
  selector: 'app-card-audio',
  templateUrl: './card-audio.component.html',
  styleUrls: [ './card-audio.component.scss' ]
} )
export class CardAudioComponent implements OnInit {
  @Input( 'post' ) post: Post;

  constructor () { }

  ngOnInit() {
  }

}
