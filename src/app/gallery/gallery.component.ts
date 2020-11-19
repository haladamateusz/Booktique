import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from '../post.interface';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent{
  @Input() posts: Post[];
  @Output() openModal = new EventEmitter<Post>();
  constructor() { }

  showModal(post: Post): void {
    this.openModal.emit(post);
  }
}
