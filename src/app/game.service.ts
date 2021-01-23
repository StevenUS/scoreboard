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
        const savedPlayers = localStorage.getItem(this.PLAYERS);
        if (savedPlayers) {
            this.players$.next(JSON.parse(savedPlayers));
        } else {
            this.initTwoPlayers();
        }
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

    private updatePlayers$(players: Player[]): void {
        this.players$.next(players);
        this.savePlayersState();
    }

    private savePlayersState(): void {
        localStorage.setItem(this.PLAYERS, JSON.stringify(this.players$.getValue()));
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
                    this.updatePlayers$(players)
                    break;
                }
            }
        }
    }

    private isHighest(turns: any, points: number) {
        return Math.max(...turns.map((t: any) => t.points)) <= points;
    }

    doTurn(points: string): void {
        const players = this.players$.getValue();
        for (let i = 0; i < players.length; i++) {
            if (players[i].isTurn) {

                // add points
                const p = parseInt(points);
                const total = players[i].turns.length ?
                    players[i].turns[players[i].turns.length - 1].total + p : p;
                const isHighest = this.isHighest(players[i].turns, p);
                if (isHighest) {
                    players[i].turns.forEach(t => t.high = false);
                }
                players[i].turns.push({points: p, total: total, high: isHighest});
                // next turn
                players[i].isTurn = false;
                const nextIdx = i === players.length - 1 ? 0 : i + 1;
                players[nextIdx].isTurn = true;
                this.updatePlayers$(players);
                break;
            }
        }
    }

    resetGame() {
        localStorage.removeItem(this.PLAYERS);
        this.players$.next([]);
        this.initTwoPlayers();
    }

}
