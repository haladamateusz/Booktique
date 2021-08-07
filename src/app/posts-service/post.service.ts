import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post } from '../interfaces/post.interface';
import { map, skipWhile, switchMap, take, tap } from 'rxjs/operators';
import { ProfileData } from '../interfaces/profile.data.interface';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  // debug purposes
  public postsLoaded = 0;
  private profileInfo = new BehaviorSubject<ProfileData>(environment.initialData);

  constructor(public http: HttpClient) {
  }

  get profileData(): Observable<ProfileData> {
    return this.profileInfo.asObservable().pipe(
      switchMap((data: ProfileData) => {
        if (!data || data.posts.length <= 0) {
          return this.fetchProfileData();
        } else {
          return of(data);
        }
      }),
      skipWhile(data => data.posts.length < 1),
      take(1),
      tap(data => this.postsLoaded = data.posts.length)
      );
  }

  getPostData(postId: number): Observable<Post> {
    return this.profileInfo.asObservable().pipe(
      switchMap((data: ProfileData) => {
        if (!data || data.posts.length <= 0) {
          return this.fetchProfileData();
        } else {
          return of(data);
        }
      }),
      skipWhile(data => data.posts.length < 1),
      take(1),
      map((data: ProfileData) => {
          if (data.posts) {
            return data.posts.find(p => p.id === postId);
          }
        }
      ));
  }

  fetchProfileData(): Observable<ProfileData> {
    return this.http.get(environment.url)
      .pipe(
        map((res: any) => res.graphql.user),
        take(1),
        tap(data => {
          const posts = [];
          const images = data.edge_owner_to_timeline_media.edges.map(post =>
            post.node.display_url);
          const texts = data.edge_owner_to_timeline_media.edges.map(post =>
            post.node.edge_media_to_caption.edges.map(d => d.node.text));


          for (let i = 0, index = this.postsLoaded; i < this.postsLoaded; i++, index--) {
            posts.push({
              image: images[i],
              text: texts[i],
              id: index
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
