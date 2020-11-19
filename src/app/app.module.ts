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
import {PostModalComponent} from './post-modal/post-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {PhotosService} from './photos-service/photos.service';
import {HttpClientModule} from '@angular/common/http';
import {ShellComponent} from './shell/shell.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    JumbotronComponent,
    GalleryComponent,
    PostModalComponent,
    ShellComponent
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
        HttpClientModule


    ],
  providers: [PhotosService],
  bootstrap: [AppComponent],
  entryComponents: [PostModalComponent]
})
export class AppModule { }
