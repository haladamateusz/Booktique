import {Component, Input, OnInit} from '@angular/core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  instagramIcon = faHashtag;
  mailIcon = faHashtag;
  websiteIcon = faHashtag;

  @Input() biography;
  @Input() followers;
  @Input() postsCount;
  @Input() profilePicture;
  constructor() {
  }

  ngOnInit(): void {
  }

}
