import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Post} from '../post.interface';
import {concatMap, last, map, skipWhile, switchMap, take, takeWhile, tap} from 'rxjs/operators';

interface ProfileData {
  posts: Post[];
  biography: string;
  followers: number;
  postsCount: number;
  profilePicture: string;
}

// const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a dui aliquam, maximus' +
//   ' dolor posuere, commodo ipsum. Donec feugiat augue nec mi hendrerit laoreet. Nullam tristique egestas pretium. ' +
//   'Maecenas magna odio, semper nec ex quis, faucibus dapibus erat. Quisque ac iaculis eros. Sed ac tellus enim. ' +
//   'Nullam pretium efficitur ultricies. Vivamus suscipit elit ut eros iaculis pretium. Nam lacinia quam sit amet mauris semper, ' +
//   'quis egestas urna tincidunt.';
// const PICSUM = 'https://picsum.photos/200';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private initialData: ProfileData = {
    posts: [],
    biography: '',
    followers: 0,
    postsCount: 0,
    profilePicture: ''
  };
  // instagram is lazy-loading photos so with api call you can get only 12 of them
  private POSTS_LOADED = 12;
  private profileInfo = new BehaviorSubject<ProfileData>(this.initialData);


  // debug purposes
  // private postMockData: ProfileData = {
  //   posts: [
  //     {
  //       id: 1,
  //       text: LOREM_IPSUM,
  //       image: PICSUM
  //     },
  //     {
  //       id: 2,
  //       text: LOREM_IPSUM,
  //       image: PICSUM
  //     },
  //     {
  //       id: 3,
  //       text: LOREM_IPSUM,
  //       image: PICSUM
  //     },
  //     {
  //       id: 4,
  //       text: LOREM_IPSUM,
  //       image: PICSUM
  //     }],
  //   biography: 'Lorem Ipsum',
  //   followers: 123,
  //   postsCount: 123,
  //   profilePicture: PICSUM
  // };
  // private profileInfoMockData = new BehaviorSubject<ProfileData>(this.postMockData);
  //

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
      take(1));
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
        take(1),
        map((res: any) => res.graphql.user),
        tap(data => {
          const posts = [];

          const images = data.edge_owner_to_timeline_media.edges.map(post =>
            post.node.display_url);
          const texts = data.edge_owner_to_timeline_media.edges.map(post =>
            post.node.edge_media_to_caption.edges.map(d => d.node.text));


          for (let i = 0, index = 12; i < this.POSTS_LOADED; i++, index--) {
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
