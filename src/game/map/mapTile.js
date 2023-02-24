import Collider from "../../core/components/collider";
import Drawable from "../../core/components/drawable";
import GameObject from "../../core/gameObject";
import TILES from  "./tilesList";
import Vector from "../../core/models/vector";

class MapTile extends GameObject {
    #TILE_WIDTH = 64;
    #TILE_HEIGHT = 64;

    constructor(tileGID, xOffset, yOffset, isCollidable, ...props) {
        super(...props);
        this.GID = tileGID;
        this.transform.position.x = xOffset;
        this.transform.position.y = yOffset;
        this.transform.size.x = this.#TILE_WIDTH;
        this.transform.size.y = this.#TILE_HEIGHT;
        
        this.image = this.getImageFromTileId();
        if (this.image !== null) {
            this.addComponent(new Drawable(this.image, this.#TILE_WIDTH, this.#TILE_HEIGHT));
        }

        if (isCollidable) {
            this.addComponent(new Collider());
        }
    }

    getPos(){
        return new Vector(this.transform.position.x, this.transform.position.y);
    }
    
    isWalkable() { return !this.isCollidable; }

    getImageFromTileId() {
        const image = TILES["tile_" + (this.GID >= 10 ? "" : "0") + String(this.GID)];
        return image === undefined ? null : image;
    }
}

export default MapTile;