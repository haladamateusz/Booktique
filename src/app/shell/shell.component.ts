import {Component, OnDestroy, OnInit} from '@angular/core';
import {PhotosService} from '../photos-service/photos.service';
import {Post} from '../post.interface';
import {PostModalComponent} from '../gallery/post-modal/post-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

// instagram is lazy-loading photos so with api call you can get only 12 of them
const POSTS_LOADED = 12;

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  biography: string;
  followers: number;
  postsCount: number;
  posts: Post[] = [];
  profilePicture: string;
  dataLoaded = false;
  photosStream: Subscription;
  breakpointsStream: Subscription;

  cols: number;
  gutterSize: string;
  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 4,
    sm: 3,
    xs: 2
  };

  gutterSizeBreakpoint = {
    xl: '10px',
    lg: '10px',
    md: '10px',
    sm: '10px',
    xs: '5px',
  };


  constructor(private photosService: PhotosService,
              protected dialog: MatDialog,
              private breakpointObserver: BreakpointObserver) {
    this.breakpointsStream = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
          this.gutterSize = this.gutterSizeBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
          this.gutterSize = this.gutterSizeBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
          this.gutterSize = this.gutterSizeBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
          this.gutterSize = this.gutterSizeBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
          this.gutterSize = this.gutterSizeBreakpoint.xl;
        }
      }
    });
  }

  ngOnInit(): void {
    this.photosStream = this.photosService.getProfileData()
      .pipe(map(
        res => res.graphql.user))
      .subscribe(data => this.loadPhotos(data));
  }

  loadPhotos(data): void {
    this.biography = data.biography.split('e-mail', 1);
    this.followers = data.edge_followed_by.count;
    this.postsCount = data.edge_owner_to_timeline_media.count;
    this.profilePicture = data.profile_pic_url_hd;

    const images = data.edge_owner_to_timeline_media.edges.map(post =>
      post.node.display_url
    );
    const texts = data.edge_owner_to_timeline_media.edges.map(post =>
      post.node.edge_media_to_caption.edges.map(d => d.node.text)
    );
    for (let i = 0; i < POSTS_LOADED; i++) {
      this.posts.push({
        image: images[i],
        text: texts[i]
      });
    }
    this.dataLoaded = true;
  }

  openModal(p: Post): void {
    this.dialog.open(PostModalComponent, {
      autoFocus: false,
      backdropClass: 'backdrop-background',
      data: {
        image: p.image,
        text: p.text
      }
    });
  }

  ngOnDestroy(): void {
    this.photosStream.unsubscribe();
    this.breakpointsStream.unsubscribe();
  }

}
