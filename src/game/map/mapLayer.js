import GameObject from "../../core/gameObject";
import MapTile from "./mapTile";

class MapLayer {
    #COLLIDABLE_LAYERS = ["Base",];

    constructor(layer) {
        this.name = layer.name;
        this.visable = layer.visable;
        this.width = layer.width;
        this.height = layer.height;
        this.data = layer.data.flat();

        this.tiles = [];
        this.data.forEach((tileGID, index) => {
            if (tileGID > 0) {
                this.tiles.push(
                    new MapTile(
                        tileGID,
                        (index % this.width)*64,
                        (Math.floor(index/this.width))*64,
                        this.hasCollidableTiles(tileGID)
                ));
            }
        });

        this.tiles.forEach((tile) => GameObject.instantiate(tile));
    }

    hasCollidableTiles() {
        return this.#COLLIDABLE_LAYERS.includes(this.name);
    }
}

export default MapLayer;