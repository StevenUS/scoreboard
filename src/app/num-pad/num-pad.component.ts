import {Component, OnInit} from '@angular/core';
import {NumPadService} from '../num-pad.service';

@Component({
    selector: 'app-num-pad',
    templateUrl: './num-pad.component.html',
    styleUrls: ['./num-pad.component.scss']
})
export class NumPadComponent implements OnInit {
    scratch: number[];

    constructor(private scorePadService: NumPadService) {
        this.scratch = this.scorePadService.scratch;
    }

    ngOnInit(): void {
    }

    press(val: number) {
        this.scorePadService.add(val);
    }

    clear() {
        this.scorePadService.clear();
    }

    enter() {
        this.scorePadService.submit();
    }
}
