import {Component, OnInit} from '@angular/core';
import {PhotosService} from '../photos.service';
import {Post} from '../post.interface';
import {PostModalComponent} from '../post-modal/post-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  biography: string;
  followers: string;
  postsCount: number;
  posts: Post[] = [];
  profilePicture: string;
  dataLoaded = false;

  constructor(private photosService: PhotosService,
              protected dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.photosService.getProfileData().subscribe(results => {
      const data = results.graphql.user;
      this.biography = data.biography.split('priv', 1);
      this.followers = data.edge_followed_by.count;
      this.postsCount = data.edge_owner_to_timeline_media.count;
      const images = data.edge_owner_to_timeline_media.edges.map(post =>
        post.node.display_url
      );
      const texts = data.edge_owner_to_timeline_media.edges.map(post =>
        post.node.edge_media_to_caption.edges.map(d => d.node.text)
      );
      this.profilePicture = data.profile_pic_url_hd;
      for (let i = 0; i < this.postsCount; i++) {
        this.posts.push({
          image: images[i],
          text: texts[i]
        });
      }
      this.dataLoaded = true;
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

}
