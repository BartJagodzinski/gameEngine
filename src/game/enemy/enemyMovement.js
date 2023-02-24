import Behaviour from '../../core/components/behaviour';
import Input from '../../core/input';

class EnemyMovement extends Behaviour {
    constructor(...props) {
        super(...props);
    }

    start() {
    }

    update() {
        if (Input.getKey("k")) {
            this.gameObject.transform.rotation += 1;
        }
    }

    onCollision(/*other*/) {
        //console.log(other.gameObject.name);
    }
}

export default EnemyMovement;
