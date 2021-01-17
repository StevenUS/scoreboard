import {Component, Input, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import {Player} from '../models/Player';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    @Input() player!: Player;

    constructor(private gameService: GameService) {}

    ngOnInit(): void {
        console.log(this.player);
    }

    doTurn(points: string) {
        if (points) {
            this.gameService.addTurn(this.player, points);
            this.gameService.nextTurn(this.player);
        }
    }

}
