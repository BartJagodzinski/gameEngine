import Component from './component';
import Vector from '../models/vector';

class Transform extends Component {
    constructor(position, size, scale, rotation, ...props) {
        super(...props);
        this.position = position || new Vector(0,0);
        this.size = size || new Vector(0,0);
        this.scale = scale || new Vector(1,1);
        this.rotation = rotation || 0;
    }

    get radRotation() {
        return this.rotation * Math.PI / 180;
    }

    get origin() {
        return new Vector(
            this.position.x + this.size.x / 2,
            this.position.y + this.size.y / 2    
        );
    }

    get upperLeft() {
        const UL = new Vector(this.position.x, this.position.y);
        UL.rotateAboutOrigin(this.origin, this.rotation);
        return UL;
    }

    get upperRight() {
        const UR = new Vector(this.position.x + this.size.x, this.position.y);
        UR.rotateAboutOrigin(this.origin, this.rotation);
        return UR;
    }
    
    get lowerLeft() {
        const LL = new Vector(this.position.x, this.position.y + this.size.y);
        LL.rotateAboutOrigin(this.origin, this.rotation);
        return LL;
    }

    get lowerRight() {
        const LR = new Vector(this.position.x + this.size.x, this.position.y + this.size.y);
        LR.rotateAboutOrigin(this.origin, this.rotation);
        return LR;
    }

    lookAt(target){
        this.rotation = -90-Math.atan2(this.position.y - target.y, this.position.x - target.x) * 180 / Math.PI;
    }
    
    move(vector) {
        vector.rotate(this.rotation);
        this.position.x += vector.x;
        this.position.y += vector.y;
    }
}

export default Transform;
