import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Post} from '../post.interface';
import {map, switchMap, tap} from 'rxjs/operators';

interface ProfileData {
  posts: Post[];
  biography: string;
  followers: number;
  postsCount: number;
  profilePicture: string;
}


@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  // instagram is lazy-loading photos so with api call you can get only 12 of them
  private POSTS_LOADED = 12;
  private initData: ProfileData = {
    posts: [],
    followers: 0,
    postsCount: 0,
    biography: '',
    profilePicture: ''
  };
  private profileInfo = new BehaviorSubject<ProfileData>(this.initData);

  constructor(public http: HttpClient) {
  }

  get profileData(): Observable<ProfileData> {
    return this.profileInfo.asObservable();
  }

  fetchProfileData(): Observable<ProfileData> {
    return this.http.get(environment.url)
      .pipe(
        map((res: any) => res.graphql.user),
        tap(data => {
          const posts = [];

          const images = data.edge_owner_to_timeline_media.edges.map(post =>
            post.node.display_url
          );
          const texts = data.edge_owner_to_timeline_media.edges.map(post =>
            post.node.edge_media_to_caption.edges.map(d => d.node.text)
          );
          const ids = data.edge_owner_to_timeline_media.edges.map(post =>
            post.node.id);

          for (let i = 0; i < this.POSTS_LOADED; i++) {
            posts.push({
              image: images[i],
              text: texts[i],
              id: ids[i]
            });
          }

          const profileData: ProfileData = {
            posts,
            biography: data.biography.split('e-mail', 1),
            followers: data.edge_followed_by.count,
            postsCount: data.edge_owner_to_timeline_media.count,
            profilePicture: data.profile_pic_url_hd
          };
          this.profileInfo.next(profileData);
        })
      );
  }
}
