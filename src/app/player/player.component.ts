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

}
