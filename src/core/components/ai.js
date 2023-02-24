import Behaviour from './behaviour';
import Vector from '../models/vector';
import Tile from './tile';
import GameObject from '../gameObject';

class AI extends Behaviour {

    constructor(...props) {
        super(...props);  
		this.velocity = 3;
		this.path = [];
    }	

	update() {		
		let player = GameObject.findByTag('Player');
		
		if(this.path.length == 0) this.aStar(this.gameObject.transform.position, player[0].getPos());
		
		if(this.path.length > 0) this.move();
	}	
	
	move(){			
		this.gameObject.transform.lookAt(this.path[this.path.length-1]);
		
		if(this.getTileID(this.gameObject.transform.position) == this.getTileID(this.path[this.path.length-1])) this.path.pop();
		
		this.gameObject.transform.move(new Vector(0,this.velocity));
	}

	aStar(targt, strt) {
		let map = GameObject.findByTag('Map');
		let start = new Tile(this.getTileID(strt));
		start.setGcost(0);
		start.setHcost(this.getDistance(strt, targt));
		let target = new Tile(this.getTileID(targt));
		target.setGcost(this.getDistance(strt, targt));
		target.setHcost(0);
		let openedID = []; let openSet = [];			
		let closedID = []; let closedSet = [];
		openSet.push(start); openedID.push(start.getID());
		let loop = true;
		while(loop){
			let currentTile = openSet[0];
			currentTile.setGcost(this.getDistance(currentTile.getCenterPos(), start.getCenterPos()));
			currentTile.setHcost(this.getDistance(currentTile.getCenterPos(), target.getCenterPos()));

			openSet.forEach((tile) => {
				if(tile.getFcost() < currentTile.getFcost() || tile.getFcost() == currentTile.getFcost()){
					if(tile.getHcost() < currentTile.getHcost()) currentTile = tile;
				}
			});     

			let index = openedID.indexOf(currentTile.getID());			
			if (index > -1) {openedID.splice(index,1); openSet.splice(index, 1);}
			closedSet.push(currentTile); 
			closedID.push(currentTile.getID());

			if(currentTile.getID() == target.getID()) {              
				let current = currentTile; let path = [];


				while(current.getID() != start.getID()){
					path.push(current.getCenterPos());
					current = current.getParent();
				}
				loop=false;	
				path.reverse();
				this.path = path;
			}

			let neighboursPos = currentTile.getNeighbours();
			let neighbours = [];

			neighboursPos.forEach((n) => {
				neighbours.push(new Tile(this.getTileID(n)));
			});

			neighbours.forEach((neighbour) => {		

				if(map[0].walkable(neighbour.getPos()) == true && !closedID.includes(neighbour.getID())) { 

					neighbour.setHcost(this.getDistance(neighbour.getCenterPos(), target.getCenterPos()));
					neighbour.setGcost(this.getDistance(neighbour.getCenterPos(), start.getCenterPos()));
	
					let newCost = currentTile.getGcost() + this.getDistance(currentTile, neighbour);

					if(newCost < neighbour.getGcost() || !openedID.includes(neighbour.getID())){
						neighbour.setGcost(newCost);
						neighbour.setHcost(this.getDistance(neighbour, target));
						neighbour.setParent(currentTile);
	
						if(!openedID.includes(neighbour.getID())) {openSet.push(neighbour);  openedID.push(neighbour.getID());}
					}    
				}					        
			});
		}
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


	getDistance(tileApos, tileBpos) { return Math.sqrt(Math.pow((tileBpos.x - tileApos.x),2) + Math.pow((tileBpos.y - tileApos.y),2)); 	}
}

export default AI;
