import Behaviour from "../../core/components/behaviour";

class ObjectLifeManager extends Behaviour {
    constructor(...props) {
        super(...props);
    }

    update() {
        if (this.gameObject?.life <= 0) {
            this.gameObject.destroy();
        }
    }
}

export default ObjectLifeManager;