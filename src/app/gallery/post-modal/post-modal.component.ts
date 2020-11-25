import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Post} from '../../post.interface';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent {
  post: Post;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.post = {
      image: data.image,
      text: data.text
    };
  }

}
