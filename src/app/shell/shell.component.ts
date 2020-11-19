import {Component, OnDestroy, OnInit} from '@angular/core';
import {PhotosService} from '../photos-service/photos.service';
import {Post} from '../post.interface';
import {PostModalComponent} from '../post-modal/post-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  biography: string;
  followers: string;
  postsCount: number;
  posts: Post[] = [];
  profilePicture: string;
  dataLoaded = false;
  photosStream: Subscription;

  constructor(private photosService: PhotosService,
              protected dialog: MatDialog) {
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
    for (let i = 0; i < this.postsCount; i++) {
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
  }

}
