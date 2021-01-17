import {Component, Input, OnInit} from '@angular/core';
import {GameService} from '../game.service';

@Component({
    selector: 'app-add-score',
    templateUrl: './add-score.component.html',
    styleUrls: ['./add-score.component.scss']
})
export class AddScoreComponent implements OnInit {
    @Input() isTurn!: boolean;

    constructor(private gameService: GameService) {}

    ngOnInit(): void {
    }

    doTurn(points: string, e$: Event) {
        e$.preventDefault();
        if (points) {
            this.gameService.addTurn(points);
            this.gameService.nextTurn();
        }
    }


}
