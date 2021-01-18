import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GameService} from '../game.service';

@Component({
    selector: 'app-add-score',
    templateUrl: './add-score.component.html',
    styleUrls: ['./add-score.component.scss']
})
export class AddScoreComponent implements OnInit, OnChanges {
    @Input() isTurn!: boolean;
    @ViewChild('points') points: any;

    constructor(private gameService: GameService) {}

    ngOnInit(): void {
    }

    ngOnChanges(_changes: SimpleChanges) {
        if (this.isTurn && this.points) {
            setTimeout(() => {
                this.points.nativeElement.focus();
                this.points.nativeElement.select();
            })
        }
    }

    doTurn(points: string, e$: Event) {
        e$.preventDefault();
        if (points) {
            this.gameService.addTurn(points);
            this.gameService.nextTurn();
        }
    }


}
