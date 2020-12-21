import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Post} from '../../post.interface';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent {
  post = {
    image: '',
    text: ''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    console.log('ppp', data);
    this.post.image = data.image;
    this.post.text = data.text;
  }

}
