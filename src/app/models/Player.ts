export class Player {
    name: string;
    isTurn: boolean;
    turns: { points: number; total: number; high?: boolean}[];

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

}
