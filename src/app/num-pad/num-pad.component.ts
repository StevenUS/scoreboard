import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NumPadService} from '../num-pad.service';

@Component({
    selector: 'app-num-pad',
    templateUrl: './num-pad.component.html',
    styleUrls: ['./num-pad.component.scss']
})
export class NumPadComponent implements OnInit, AfterViewInit {
    @ViewChild('numpad') numPad!: ElementRef;
    scratch: number[];

    constructor(private scorePadService: NumPadService) {
        this.scratch = this.scorePadService.scratch;
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
    }

    press(val: number) {
        this.scorePadService.add(val);
    }

    clear(): void {
        this.scorePadService.clear();
    }

    private ds(): void {
        this.numPad.nativeElement.scrollIntoView()
    }

    enter() {
        this.scorePadService.submit();
        setTimeout(this.ds.bind(this));
    }
}
