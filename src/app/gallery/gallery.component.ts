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
  @Input() cols: number;
  @Input() gutterSize: string;

}
