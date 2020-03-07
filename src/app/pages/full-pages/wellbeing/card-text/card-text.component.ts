import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'app/shared/models/post';

@Component( {
  selector: 'app-card-text',
  templateUrl: './card-text.component.html',
  styleUrls: [ './card-text.component.scss' ]
} )
export class CardTextComponent implements OnInit {
  @Input() post: Post;

  constructor (
    private modalService: NgbModal
  ) { }

  ngOnInit(

  ) {
  }

  open( content: TemplateRef<any> ) {
    const modalRef = this.modalService.open( content, { size: 'lg' } );

    modalRef.result.then( ( result ) => {
    } ).catch( ( error ) => {
      console.log( error );
    } );
  }
}
