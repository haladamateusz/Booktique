import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../posts-service/post.service';
import {Post} from '../post.interface';
import {Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


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


  constructor(private postService: PostService,
              private breakpointObserver: BreakpointObserver
  ) {
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
  }

  ngOnInit(): void {
    this.postService.fetchProfileData().subscribe(() => {
        this.dataLoaded = true;
      },
      error => {
        console.log(error);
        this.errorOccurred = true;
      });
    this.posts$ = this.postService.profileData.subscribe(data => {

      // data dataLoaded is moved here just for debug purposes
      // this.dataLoaded = true;
      this.posts = data.posts;
      this.followers = data.followers;
      this.postsCount = data.postsCount;
      this.biography = data.biography;
      this.profilePicture = data.profilePicture;
    });
  }


  ngOnDestroy(): void {
    this.posts$.unsubscribe();
  }

}
