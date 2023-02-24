import GameObject from "../../core/gameObject";
import default_map from "../../../assets/maps/default_map.json";
import MapLayer from "./mapLayer";
import Vector from '../../core/models/vector';

class Map extends GameObject {
    constructor(map_file, ...props) {
        super(...props);
        this.structure = map_file || default_map;
        this.layers = this.structure.layers.map((layer) => new MapLayer(layer));

        this.width = this.structure.width * this.structure.tilewidth;
        this.height = this.structure.height * this.structure.tileheight;
    }
    
    walkable(position){
        let walkable = true;
        let width = 64; let height = 64;
    
        let n1 = new Vector(position.x - width, position.y - height);
        let n2 = new Vector(position.x, position.y - height);
        let n3 = new Vector(position.x + width, position.y - height);
    
        let n4 = new Vector(position.x - width, position.y);
        let n5 = new Vector(position.x + width, position.y);
    
        let n6 = new Vector(position.x - width, position.y + height);
        let n7 = new Vector(position.x, position.y + height);
        let n8 = new Vector(position.x + width, position.y + height);
    
        let neighbours = [ n1, n2, n3, n4, n5, n6, n7, n8];
    
        let n =  neighbours.filter(function(neighbours) {
            return neighbours.x >= 0 && neighbours.y >= 0 && neighbours.x <= 3200 && neighbours.y <= 3200;
        });  
        
        n.forEach((neighbour) => {
            if(!this.isTileWalkable(neighbour)) walkable = false;
        });
        return walkable;
    }

    isTileWalkable(position){
        let isWalkable = true;

        this.layers[1].tiles.forEach((tile) => {
            if(this.getTileID(position) == this.getTileID(tile.getPos())) isWalkable = false;
        });

        return isWalkable;
    }

    getTileID(position) {		
		let posX = position.x; let posY = position.y;

		if(posX == 3200) posX -= 1; 
		if(posY == 3200) posY -= 1;

		let x = Math.ceil((posX + 0.1) / 64);	
		let y = Math.ceil((posY + 0.1) / 64);

		if(y > 1) y = y*50-50;	
		else y = 0;

		return x+y-1;
	}
}

export default Map;