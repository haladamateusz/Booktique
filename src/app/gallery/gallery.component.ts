import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from '../post.interface';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent{
  @Input() posts: Post[];
  @Output() openModal = new EventEmitter<Post>();
  @Input() cols: number;
  @Input() gutterSize: string;

  showModal(post: Post): void {
    this.openModal.emit(post);
  }
}
