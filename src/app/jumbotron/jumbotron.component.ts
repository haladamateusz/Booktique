import {Component, Input, OnInit} from '@angular/core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  instagramIcon = faInstagram;
  mailIcon = faEnvelope;
  websiteIcon = faGlobeEurope;

  @Input() biography;
  @Input() followers;
  @Input() postsCount;
  @Input() profilePicture;
  constructor() {
  }

  ngOnInit(): void {
  }

}
