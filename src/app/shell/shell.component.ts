import {Component, OnDestroy, OnInit} from '@angular/core';
import {PhotosService} from '../photos-service/photos.service';
import {Post} from '../post.interface';
import {PostModalComponent} from '../gallery/post-modal/post-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

interface ProfileData {
  posts: Post[];
  biography: string;
  followers: number;
  postsCount: number;
  profilePicture: string;
}

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
  errorOccurred = false;
  posts$: Subscription;
  breakpoints$: Subscription;

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
              private breakpointObserver: BreakpointObserver,
              private router: Router,
              private route: ActivatedRoute) {
    this.breakpoints$ = this.breakpointObserver.observe([
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

    // this.route.paramMap.subscribe(paramMap => {
    //   if (paramMap.has('postId')) {
    //     console.log(paramMap.get('postId'));
    //   }
      // this.placeSubs = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
      //   this.place = place;
      // });
    // });
  }

  ngOnInit(): void {
    this.posts$ = this.photosService.fetchProfileData().pipe(
      switchMap(val => this.photosService.profileData),
      tap((data: ProfileData) => {
        this.posts = data.posts;
        this.biography = data.biography;
        this.profilePicture = data.profilePicture;
        this.postsCount = data.postsCount;
        this.followers = data.followers;
      })
    ).subscribe(() => {
        this.dataLoaded = true;
      },
      error => {
        this.errorOccurred = true;
      });
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
    this.posts$.unsubscribe();
  }

}
