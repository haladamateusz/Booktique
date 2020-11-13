import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PostModalComponent} from '../post-modal/post-modal.component';
import {PhotosService} from '../photos.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(protected dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openModal(): void {
    this.dialog.open(PostModalComponent, {
      autoFocus: false,
      backdropClass: 'backdrop-background',
      data: {
        img: 'https://image.shutterstock.com/image-photo/pooping-white-dog-shiba-inu-600w-1420432652.jpg',
        text: 'Lorem ipsum ergo sum. Lorem ipsum ergo sum. Lorem ipsum ergo sum. Lorem ipsum ergo sum. Lorem ipsum ergo sum. Lorem ipsum ergo sum. Lorem ipsum ergo sum. ',
        hashtags: '#sex #sexedpl #anjarubik'
      }
    });
  }

}
