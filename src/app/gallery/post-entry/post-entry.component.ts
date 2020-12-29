import {Component, OnDestroy} from '@angular/core';
import {PostModalComponent} from '../post-modal/post-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../posts-service/post.service';
import {switchMap, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';


@Component({
  template: ''
})
export class PostEntryComponent implements OnDestroy {
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
      this.ModalSub = dialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('/home');
      });
    });
  }

  ngOnDestroy(): void {
    this.ModalSub.unsubscribe();
  }
}
