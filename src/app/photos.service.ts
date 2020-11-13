import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(public http: HttpClient) {
  }

  getProfileData(): Observable<any> {
    const url = 'https://www.instagram.com/vickinestoruk.booktique/?__a=1';
    return this.http.get(url);
  }
}
