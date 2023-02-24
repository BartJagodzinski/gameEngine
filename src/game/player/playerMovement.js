import Behaviour from '../../core/components/behaviour';
import Input from '../../core/input';
import Vector from '../../core/models/vector';

class PlayerMovement extends Behaviour {
    constructor(...props) {
        super(...props);
        this.maxVelocity = 3;
        this.maxRotationSpeed = 1.5;
        this.velocity = 0;
        this.rotation = 0;
    }

    start() {
    }

    update() {
        this.handleVelocityInputs();
        this.handleRotationInputs();
        
        this.gameObject.transform.move(new Vector(0,this.velocity));
        this.gameObject.transform.rotation += this.rotation;
    }

    handleVelocityInputs() {
        let velocityStep = 0.1;

        if (Input.getKey("w")) {
            this.velocity -= velocityStep;
        } else if (Input.getKey("s")) {
            this.velocity += velocityStep;
        } else {
            this.velocity = 0;
        }

        if (this.velocity > this.maxVelocity) {
            this.velocity = this.maxVelocity;
        }
        if (this.velocity < -this.maxVelocity) {
            this.velocity = -this.maxVelocity;
        }
    }

    handleRotationInputs() {
        let rotationStep = 0.1;

        if (Input.getKey("a")) {
            this.rotation += rotationStep;
        } else if (Input.getKey("d")) {
            this.rotation -= rotationStep;
        } else {
            this.rotation = 0;
        }

        if (this.rotation > this.maxRotationSpeed) {
            this.rotation = this.maxRotationSpeed;
        }
        if (this.rotation < -this.maxRotationSpeed) {
            this.rotation = -this.maxRotationSpeed;
        }
    }

    onCollision(/*other*/) {
        //console.log(other.gameObject.name);
    }
}

export default PlayerMovement;
