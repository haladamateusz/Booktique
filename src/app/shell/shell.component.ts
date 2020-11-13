import {Component, OnInit} from '@angular/core';
import {PhotosService} from '../photos.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  biography: string;
  followers: string;
  postsCount: string;
  posts: [];
  profilePicture: string;

  constructor(private photosService: PhotosService) {
  }

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.photosService.getProfileData().subscribe(results => {
      const data = results.graphql.user;
      console.log(data);
      this.biography = data.biography.split('priv', 1);
      this.followers = data.edge_followed_by.count;
      this.postsCount = data.edge_owner_to_timeline_media.count;
      const images = data.edge_owner_to_timeline_media.edges.map(post =>
        post.node.display_url
      );
      const texts = data.edge_owner_to_timeline_media.edges.map(post =>
        post.node.edge_media_to_caption.edges.map(d => d.node.text)
      );
      // tslint:disable-next-line:prefer-for-of
      // for (let i = 0; i < images.length; i++) {
      //     this.posts.push({
      //       image: images[i],
      //       text: texts[i]
      //     });
      // }
      this.profilePicture = data.profile_pic_url_hd;
    });
  }

}
