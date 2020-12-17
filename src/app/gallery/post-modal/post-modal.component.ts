import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Post} from '../../post.interface';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent {
  text: string;
  image: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.image = data.image;
    this.text = data.text;
  }

}
