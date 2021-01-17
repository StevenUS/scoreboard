export class Player {
    name: string;
    isTurn: boolean;
    turns: { points: number; total: number; }[];

    constructor(name: string) {
        this.name = name;
        this.turns = [];
        this.isTurn = false;
    }
    
    static fromPlayer(player: {name: string, turns: [], isTurn: boolean}): Player {
        const newPlayer = new Player(player.name);
        newPlayer.turns = player.turns;
        newPlayer.isTurn = player.isTurn;
        return newPlayer;
    }

    addTurn(points: string): void {
        const p = parseInt(points);
        const total = this.turns.length ? this.turns[this.turns.length - 1].total + p : p;
        this.turns.push({ points: p, total: total });
    }

}
