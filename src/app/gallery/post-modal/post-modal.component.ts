import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../interfaces/post.interface';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { PostService } from '../../posts-service/post.service';
import { take } from 'rxjs/operators';

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
    if (id > this.postService.postsLoaded) {
      id = 1;
    } else if (id < 1) {
      id = this.postService.postsLoaded;
    }
    this.postService.getPostData(+id).pipe(take(1)).subscribe((p: Post) => {
      this.post = p;
      this.router.navigateByUrl(`p/${id}`);
    });
  }
}
