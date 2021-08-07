import { Post } from './post.interface';

export interface ProfileData {
  posts: Post[];
  biography: string;
  followers: number;
  postsCount: number;
  profilePicture: string;
}
