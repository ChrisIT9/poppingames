import { Component, Input, OnInit } from '@angular/core';
import { GameResponse } from 'src/app/Models/Types';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() game: GameResponse | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
