import { Component } from '@angular/core';
import {Player} from './models/Player';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'scrabble-score';
    players!: Player[];
    protected readonly PLAYERS = 'players';

    constructor() {
        const savedPlayers = localStorage.getItem(this.PLAYERS);
        if (savedPlayers) {
            // this.players = JSON.parse(savedPlayers);
            this.initGameSavedGame(JSON.parse(savedPlayers));
        } else {
            // this._makeNewPlayer();
            this.initTwoPlayers();
        }
    }

    private initGameSavedGame(savedPlayers: []) {
        this.players = [];
        for (const player of savedPlayers) {
            this.players.push(Player.fromPlayer(player));
        }
    }

    private initTwoPlayers(): void {
            this.players = [];
            let player = new Player('p1');
            this.players.push(player);
            player = new Player('p2');
            this.players.push(player);
            this.setPlayerTurn(0);
    }

    private _makeNewPlayer(): void {
        let player = new Player('steven');
        player.turns.push({ points: 10, total: 10 });
        player.turns.push({ points: 11, total: 21 });
        this.players.push(player);
        player = new Player('jan');
        player.turns.push({ points: 20, total: 20 });
        player.turns.push({ points: 11, total: 31 });
        this.players.push(player);

        this.setPlayerTurn(0);
    }

    private setPlayerTurn(playerIdx: number): void {
        if (this.players && this.players.length > 0) {
            this.players.forEach((p, i) => {
                p.isTurn = i === playerIdx;
            })
        }
    }

    undo(): void {
        if (this.players.flatMap(p => p.turns).length > 0) {
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i].isTurn) {
                    this.players[i].isTurn = false;
                    const idx = i === 0 ? this.players.length - 1 : i - 1;
                    const p = this.players[idx];
                    p.isTurn = true;
                    p.turns.pop();
                    break;
                }
            }
        }
    }

    doTurn(player: Player, points: string): void {
        if (points) {
            player.addTurn(points);
            this.nextTurn(player);
            this.savePlayersState();
        }
    }

    nextTurn(player: Player): void {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] === player) {
                player.isTurn = false;
                if (i === this.players.length - 1) {
                    this.players[0].isTurn = true;
                } else {
                    this.players[i + 1].isTurn = true;
                }
            }
        }
    }

    private savePlayersState(): void {
        localStorage.setItem(this.PLAYERS, JSON.stringify(this.players));
    }

    resetGame(): void {
        localStorage.removeItem(this.PLAYERS);
        this.initTwoPlayers();
    }

}


