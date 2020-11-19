import {Component, Input} from '@angular/core';
import {faHashtag} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent {
  icon = faHashtag;

  @Input() biography: string;
  @Input() followers: number;
  @Input() postsCount: number;
  @Input() profilePicture: string;

  constructor() {
  }
}
