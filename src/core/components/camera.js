import Core from '../core';
import Component from './component';
import Transform from './transform';

class Camera extends Component {
    static MAIN;

    constructor(xView, yView, wView, hView, ...props) {
        super(...props);
        Camera.MAIN ??= this;

        // Camera position
        this.xView = xView || 0;
        this.yView = yView || 0;

        // viewport dimensions
        this.wView = wView || 0;
        this.hView = hView || 0;

        this.followed = null;
        this.xDeadZone = 0;
        this.yDeadZone = 0;

        this.worldWidth = Core.GAME_MAP.width;
        this.worldHeight = Core.GAME_MAP.height;
    }

    follow(gameObject, xDeadZone=0, yDeadZone=0) {
        this.followed = gameObject.getComponent(Transform);
        this.xDeadZone = xDeadZone;
        this.yDeadZone = yDeadZone;
    }

    update() {
        if (this.followed !== null) {
            // move camera horizontaly
            if (this.followed.position.x - this.xView + this.xDeadZone > this.wView / 2)
                this.xView = this.followed.position.x - (this.wView / 2 - this.xDeadZone);
            else if (this.followed.position.x - this.xDeadZone < this.xView + this.wView / 2)
                this.xView = this.followed.position.x - this.xDeadZone - this.wView / 2;

            // move camera verticaly
            if (this.followed.position.y - this.yView + this.yDeadZone > this.hView / 2)
                this.yView = this.followed.position.y - (this.hView / 2 - this.yDeadZone);
            else if (this.followed.position.y - this.yDeadZone < this.yView + this.hView / 2)
                this.yView = this.followed.position.y - this.yDeadZone - this.hView / 2;

        }

        // check if camera leaves the world's boundary and prevent this
        if (this.xView < 0)
            this.xView = 0;
        if (this.yView < 0)
            this.yView = 0;
        if (this.xView + this.wView > this.worldWidth)
            this.xView = this.worldWidth - this.wView;
        if (this.yView + this.hView > this.worldHeight)
            this.yView = this.worldHeight - this.hView;
    }
}

export default Camera;
