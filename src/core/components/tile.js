import Vector from '../models/vector';

class Tile{
    #TILE_WIDTH = 64;
    #TILE_HEIGHT = 64;

    constructor(id) {        
        this.id = id;
        this.position = new Vector((id % 50)*64, (Math.floor(id/50))*64);
        this.gCost = 9999;
        this.hCost = 9999;
        this.parent = this;
    }

    getID(){ return this.id; }

    getFcost(){ return this.gCost + this.hCost;  }

    getGcost(){ return this.gCost; }

    setGcost(cost){ this.gCost = cost; }

    getHcost(){ return this.hCost; }

    setHcost(cost){ this.hCost = cost; }

    getParent(){ return this.parent; }

    setParent(tile){ this.parent = tile; }

    getPos(){ return this.position; }    

    getCenterPos() {return new Vector(this.position.x + 32, this.position.y + 32); }

    getNeighbours(){ 
        let width = this.#TILE_WIDTH; let height = this.#TILE_HEIGHT;

        let n1 = new Vector(this.position.x - width, this.position.y - height);
        let n2 = new Vector(this.position.x, this.position.y - height);
        let n3 = new Vector(this.position.x + width, this.position.y - height);

        let n4 = new Vector(this.position.x - width, this.position.y);
        let n5 = new Vector(this.position.x + width, this.position.y);

        let n6 = new Vector(this.position.x - width, this.position.y + height);
        let n7 = new Vector(this.position.x, this.position.y + height);
        let n8 = new Vector(this.position.x + width, this.position.y + height);

        let neighbours = [ n1, n2, n3, n4, n5, n6, n7, n8];

        let n =  neighbours.filter(function(neighbours) {
            return neighbours.x >= 0 && neighbours.y >= 0 && neighbours.x <= 3200 && neighbours.y <= 3200;
        });       
        
        return n;
    } 

}

export default Tile;