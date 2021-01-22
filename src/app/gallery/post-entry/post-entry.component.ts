import {Component, OnDestroy} from '@angular/core';
import {PostModalComponent} from '../post-modal/post-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../posts-service/post.service';
import {switchMap, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Post} from '../../post.interface';


@Component({
  template: ''
})
export class PostEntryComponent{
  ModalSub: Subscription;

  constructor(public dialog: MatDialog,
              public router: Router,
              public route: ActivatedRoute,
              private postService: PostService) {

    this.route.paramMap.pipe(
      take(1),
      switchMap(paramMap => {
        const id = paramMap.get('postId');
        return this.postService.getPostData(+id);
      }),
      take(1),
      switchMap((data: Post) => {
        const dialogRef = this.dialog.open(PostModalComponent,
          {
            autoFocus: false,
            backdropClass: 'backdrop-background',
            data: {
              image: data.image,
              text: data.text,
              id: data.id
            }
          });
        return dialogRef.afterClosed();
      })).subscribe(() => {
      this.router.navigateByUrl('');
    });
  }
}

