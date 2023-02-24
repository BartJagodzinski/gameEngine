import GameObject from '../core/gameObject';
import Player from './player/player';
import Enemy from './enemy/enemy';
import Vector from '../core/models/vector';

class Game {
    start() {
        const e1 = new Enemy("Ememy 1", "Enemy 1", new Vector(865,115), new Vector(66,113));
        const e2 = new Enemy("Ememy 2", "Enemy 2", new Vector(225,0), new Vector(66,113));
        //const e3 = new Enemy("Ememy 3", "Enemy 3", new Vector(160,215), new Vector(66,113));

        GameObject.instantiate(new Player("Player", "Player"));
        GameObject.instantiate(e1);
        GameObject.instantiate(e2);
        //GameObject.instantiate(e3);
    }
}

export default Game;
