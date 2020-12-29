import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {JumbotronComponent} from './jumbotron/jumbotron.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GalleryComponent} from './gallery/gallery.component';
import {PostModalComponent} from './gallery/post-modal/post-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {PostService} from './posts-service/post.service';
import {HttpClientModule} from '@angular/common/http';
import {ShellComponent} from './shell/shell.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {RouterModule} from '@angular/router';
import {PostEntryComponent} from './gallery/post-entry/post-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    JumbotronComponent,
    GalleryComponent,
    PostModalComponent,
    ShellComponent,
    PostEntryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    FontAwesomeModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatGridListModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: ShellComponent,
        children: [
          {
            path: ':postId',
            component: PostEntryComponent,
            outlet: 'post'
          },
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          }
        ]
      },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home'}
    ])

  ],
  providers: [PostService],
  bootstrap: [AppComponent],
  entryComponents: [PostModalComponent]
})
export class AppModule {
}
