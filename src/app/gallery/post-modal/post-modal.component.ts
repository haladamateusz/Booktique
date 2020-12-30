import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Post} from '../../post.interface';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {PostService} from '../../posts-service/post.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent {
  post: Post;
  next = faChevronRight;
  prev = faChevronLeft;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private router: Router, private postService: PostService) {
    this.post = data;
  }

  navigate(id: number): void {
    this.postService.getPostData(+id).pipe(take(1)).subscribe(p => {
      this.post = p;
      if (id < 12 && id > 1) {
        this.router.navigateByUrl(`p/${id}`);
      } else if (id > 12) {
        this.router.navigateByUrl('p/1');
      } else {
        this.router.navigateByUrl('p/12');
      }
    });
  }
}
