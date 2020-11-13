import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'booktique';
  tiles: Tile[] = [
    {text: 'Liczba obserwujących:', cols: 3, rows: 2, color: 'whitesmoke'},
    {text: 'Photo', cols: 1, rows: 2, color: 'whitesmoke'},
  ];
}
