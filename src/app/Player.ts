export class Player {
    name: string;
    isTurn: boolean;
    turns: { points: number; total: number; }[];

    constructor(name: string) {
        this.name = name;
        this.turns = [];
        this.isTurn = false;
    }


}
