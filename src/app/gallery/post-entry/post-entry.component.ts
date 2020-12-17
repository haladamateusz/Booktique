import {Component} from '@angular/core';
import {PostModalComponent} from '../post-modal/post-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../posts-service/post.service';
import {map, switchMap, tap} from 'rxjs/operators';


@Component({
  template: ''
})
export class PostEntryComponent {
  constructor(public dialog: MatDialog,
              public router: Router,
              public route: ActivatedRoute,
              private postService: PostService) {

    this.route.paramMap.pipe(
      switchMap(paramMap => {
        return this.postService.getPostData(+paramMap.get('postId'));
      })
    ).subscribe(data => {
      const dialogRef = this.dialog.open(PostModalComponent,
        {
          autoFocus: false,
          backdropClass: 'backdrop-background',
          data: {
            image: data.image,
            text: data.text
          }
        });
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['../../'], {relativeTo: this.route});
      });
    });
  }
}
