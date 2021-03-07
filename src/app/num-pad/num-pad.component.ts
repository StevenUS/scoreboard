import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NumPadService} from '../num-pad.service';

@Component({
    selector: 'app-num-pad',
    templateUrl: './num-pad.component.html',
    styleUrls: ['./num-pad.component.scss']
})
export class NumPadComponent implements OnInit, AfterViewInit {
    @ViewChild('numpad') numPad!: ElementRef;
    scratch: number[];

    keys = {
        Digit1: 1,
        Digit2: 2,
        Digit3: 3,
        Digit4: 4,
        Digit5: 5,
        Digit6: 6,
        Digit7: 7,
        Digit8: 8,
        Digit9: 9,
        Digit0: 0,
        Enter: 10,
        Backspace: 11
    } as any;

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

    @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
        const keyValue = this.keys[event.code];
        switch (keyValue) {
            case (11):
                this.clear();
                break;
            case (10):
                this.enter();
                break;
            default:
                this.press(keyValue)
                break;
        }
    }

}
