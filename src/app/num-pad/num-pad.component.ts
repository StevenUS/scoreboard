import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {NumPadService} from '../num-pad.service';

@Component({
    selector: 'app-num-pad',
    templateUrl: './num-pad.component.html',
    styleUrls: ['./num-pad.component.scss']
})
export class NumPadComponent {
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

    private unFocus(t: EventTarget | null): void {
        if (t) {
            (t as HTMLInputElement).blur();
        }
    }

    press(val: number, t: EventTarget | null): void {
        this.unFocus(t);
        this.scorePadService.add(val);
    }

    clear(t: EventTarget | null): void {
        this.unFocus(t);
        this.scorePadService.clear();
    }

    private numpadIntoView(): void {
        this.numPad.nativeElement.scrollIntoView()
    }

    enter(t: EventTarget | null): void {
        this.unFocus(t);
        this.scorePadService.submit();
        setTimeout(this.numpadIntoView.bind(this));
    }

    @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
        const keyValue = this.keys[event.code];
        switch (keyValue) {
            case (11):
                this.clear(null);
                break;
            case (10):
                this.enter(null);
                break;
            default:
                this.press(keyValue, null)
                break;
        }
    }

}

