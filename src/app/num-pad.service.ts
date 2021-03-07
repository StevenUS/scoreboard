import {Injectable} from '@angular/core';
import {GameService} from './game.service';

@Injectable({
    providedIn: 'root'
})
export class NumPadService {
    scratch: number[] = [];

    constructor(private gameService: GameService) {
        this.scratch.push(0);
    }

    add(num: number): void {
        if (this.scratch.length === 1 && this.scratch[0] === 0) {
            this.scratch.pop();
        }
        this.scratch.push(num);
    }

    clear() {
        this.scratch.splice(0, this.scratch.length);
        this.scratch.push(0);
    }

    submit() {
        this.gameService.doTurn(this.scratch.join(''));
        this.clear();
    }

}
