import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Player} from './models/Player';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    players$ = new BehaviorSubject<Player[]>([]);
    protected readonly PLAYERS = 'players';

    constructor() {
        this.initTwoPlayers();
    }

    private initTwoPlayers(): void {
        const players = this.players$.getValue();
        let player = new Player('p1');
        players.push(player);
        player = new Player('p2');
        players.push(player);
        this.setPlayerTurn(players, 0);
        this.players$.next(players);
    }

    private setPlayerTurn(players: Player[], playerIdx: number): void {
        if (players && players.length > 0) {
            players.forEach((p, i) => {
                p.isTurn = i === playerIdx;
            })
        }
    }

    undo(): void {
        const players = this.players$.getValue();
        if (players.flatMap(p => p.turns).length > 0) {
            for (let i = 0; i < players.length; i++) {
                if (players[i].isTurn) {
                    players[i].isTurn = false;
                    const idx = i === 0 ? players.length - 1 : i - 1;
                    const p = players[idx];
                    p.isTurn = true;
                    p.turns.pop();
                    break;
                }
            }
            this.players$.next(players);
        }
    }

    nextTurn(player: Player): void {
        const players = this.players$.getValue();
        for (let i = 0; i < players.length; i++) {
            if (players[i] === player) {
                player.isTurn = false;
                const idx = i === players.length - 1 ? 0 : i + 1;
                players[idx].isTurn = true;
                this.players$.next(players);
                break;
                // if (i === players.length - 1) {
                //     players[0].isTurn = true;
                // } else {
                //     players[i + 1].isTurn = true;
                // }
            }
        }
    }

    private savePlayersState(): void {
        localStorage.setItem(this.PLAYERS, JSON.stringify(this.players$.getValue()));
    }

    resetGame() {
        localStorage.removeItem(this.PLAYERS);
    }

}
