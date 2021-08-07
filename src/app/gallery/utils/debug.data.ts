import { ProfileData } from '../../interfaces/profile.data.interface';

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a dui aliquam, maximus' +
  ' dolor posuere, commodo ipsum. Donec feugiat augue nec mi hendrerit laoreet. Nullam tristique egestas pretium. ' +
  'Maecenas magna odio, semper nec ex quis, faucibus dapibus erat. Quisque ac iaculis eros. Sed ac tellus enim. ' +
  'Nullam pretium efficitur ultricies. Vivamus suscipit elit ut eros iaculis pretium. Nam lacinia quam sit amet mauris semper, ' +
  'quis egestas urna tincidunt.';
const PICSUM = 'https://picsum.photos/200';

export const mockData: ProfileData = {
  posts: [
    {
      id: 1,
      text: LOREM_IPSUM,
      image: PICSUM
    },
    {
      id: 2,
      text: LOREM_IPSUM,
      image: PICSUM
    },
    {
      id: 3,
      text: LOREM_IPSUM,
      image: PICSUM
    },
    {
      id: 4,
      text: LOREM_IPSUM,
      image: PICSUM
    }],
    biography: 'Lorem Ipsum',
  followers: 123,
  postsCount: 213,
  profilePicture: PICSUM
}
