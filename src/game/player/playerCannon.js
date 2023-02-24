import Behaviour from "../../core/components/behaviour";
import GameObject from "../../core/gameObject";
import Input from "../../core/input";
import Vector from "../../core/models/vector";
import Cannonball from "../cannonball/cannonball";

class PlayerCannon extends Behaviour {
    #DELAY_VALUE = 50;

    constructor(...props) {
        super(...props);
        this.delay = this.#DELAY_VALUE;
        this.direction = null;
    }

    start() {
    }

    update() {
        this.handleMouseInput();
        
        if (this.delay > 0) {
            this.delay--;
        }
    }

    handleMouseInput() {
        if (Input.leftMouseButtonState === true && this.delay <= 0) {
            this.shoot();
        }
        if (Input.mousePositionX !== this.gameObject.transform.position.x || 
            Input.mousePositionY !== this.gameObject.transform.position.y) {
            let origin = this.gameObject.transform.origin;
            let target = new Vector(Input.mousePositionX, Input.mousePositionY);
            this.direction = new Vector(target.x - origin.x, target.y - origin.y).normalize();
        }
    }

    shoot() {
        if (!this.direction) { return; }

        let pos = this.gameObject.transform.origin;
        GameObject.instantiate(new Cannonball("p_cb", "p_cb", pos, this.direction, this.gameObject));
        this.delay = this.#DELAY_VALUE;
    }
}

export default PlayerCannon;