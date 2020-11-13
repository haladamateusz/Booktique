import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent {
  img: string;
  text: string;
  hashtags: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.img = data.img;
    this.text = data.text;
    this.hashtags = data.hashtags;
  }

}
