import enemy_image from '../../../assets/gfx/PNG/default_size/Ships/pirate_ship.png';
import Collider from '../../core/components/collider';
import Drawable from '../../core/components/drawable';
import EnemyMovement from './enemyMovement';
import GameObject from '../../core/gameObject';
import ObjectLifeManager from '../utils/ObjectLifeManager';
import AI from '../../core/components/ai'

class Enemy extends GameObject {
    constructor(...props) {
        super(...props);
        this.life = 100;

        this.addComponent(new Drawable(enemy_image));
        this.addComponent(new EnemyMovement());
        this.addComponent(new ObjectLifeManager());
        this.addComponent(new AI());

        let e_collider = new Collider();
        e_collider.isStatic = false;
        this.addComponent(e_collider);
    }
}

export default Enemy;
