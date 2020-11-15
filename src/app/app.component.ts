import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

// tslint:disable-next-line:ban-types
declare var gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit, OnDestroy {
  private routerSubscription: Subscription;
  constructor(private router: Router) {
  }
  ngAfterViewInit(): void {
    // subscribe to router events and send page views to Google Analytics
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        gtag('config', 'G-QRXMERBCG9', {page_path: event.urlAfterRedirects});
      });
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
