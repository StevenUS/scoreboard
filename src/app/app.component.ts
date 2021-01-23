import {Component, OnInit} from '@angular/core';
import {GameService} from './game.service';
import {Player} from './models/Player';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'scrabble-score';
    players!: Player[];

    constructor(private gameService: GameService) {
    }

    ngOnInit(): void {
        this.gameService.players$.subscribe(players => {
            this.players = players
        });
    }

    undo(): void {
        this.gameService.undo();
    }

    resetGame(): void {
        this.gameService.resetGame();
    }

}


