import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../models/Player';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    @Input() player!: Player;

    constructor() {}

    ngOnInit(): void {
    }

    addTurn(points: string): void {
        const p = parseInt(points);
        const total = this.player.turns.length ? this.player.turns[this.player.turns.length - 1].total + p : p;
        this.player.turns.push({ points: p, total: total });
    }

    doTurn(player: Player, points: string) {
    }

}
