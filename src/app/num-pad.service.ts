import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumPadService {
    scratch: number[] = [];
    submit$ = new BehaviorSubject<number>(0);

  constructor() {
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

    undo() {
        this.scratch.pop();
        if (this.scratch.length === 0) {
            this.scratch.push(0);
        }
    }

    submit() {
        this.submit$.next(parseFloat(this.scratch.join('')));
        this.clear();
    }

}
