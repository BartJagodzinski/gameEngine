import GameObject from '../../core/gameObject';
import Drawable from '../../core/components/drawable';
import Collider from '../../core/components/collider';
import Camera from '../../core/components/camera';
import player_image from '../../../assets/gfx/PNG/default_size/Ships/ship (3).png';
import Vector from '../../core/models/vector';
import PlayerCannon from './playerCannon';
import PlayerMovement from './playerMovement';

class Player extends GameObject {
    constructor(...props) {
        let position = new Vector(500,800);
        let size = new Vector(66,113); 

        super(...props, position, size);
        this.life = 200;

        const camera = new Camera(0,0,document.documentElement.clientWidth,document.documentElement.clientHeight);

        this.addComponent(camera);
        this.addComponent(new PlayerMovement());
        this.addComponent(new PlayerCannon());
        this.addComponent(new Drawable(player_image));

        let p_collider = new Collider();
        p_collider.isStatic = false;
        this.addComponent(p_collider);

        camera.follow(this);
    }

    getPos() { return this.transform.position; }
}

export default Player;