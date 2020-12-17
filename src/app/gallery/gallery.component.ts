import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from '../post.interface';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  @Input() posts: Post[];
  // @Output() openModal = new EventEmitter<Post>();
  @Input() cols: number;
  @Input() gutterSize: string;

  // constructor(private router: Router,
  //             private route: ActivatedRoute) {
  //   this.route.paramMap.subscribe(paramMap => {
  //     if (!paramMap.has('placeId')) {
  //       this.router.navigateByUrl('');
  //       return;
  //     }
  //     const placeId = paramMap.get('placeId');
  //     this.showModal(placeId);
  //   };
  // }

  // showModal(post: Post): void {
  //   this.openModal.emit(post);
  // }
}
