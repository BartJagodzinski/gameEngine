import Component from './component';
import Behaviour from './behaviour';
import Vector from '../models/vector';

class Collider extends Component {
    static DEBUG = true;

    constructor(...props) {
        super(...props);
        this.isTrigger = false;
        this.isStatic = true;
        this.isColliding = false;
        this.owner = null;
        
        this.visualize = Collider.DEBUG;
    }

    checkCollision(other) {
        if (!this.gameObject) { throw new Error("Uninstantiated component call"); }
        if (this.owner === other.gameObject || this.gameObject === other.owner) { return false; }
        
        let t1 = this.gameObject.transform;
        let t2 = other.gameObject.transform;
        
        let rectangleAxis = [
            t1.upperRight.sub(t1.upperLeft),
            t1.upperRight.sub(t1.lowerRight),
            t2.upperLeft.sub(t2.lowerLeft),
            t2.upperLeft.sub(t2.upperRight),
        ];

        if (rectangleAxis.some((axis) => !this.isAxisCollision(t1,t2,axis))) { return false; }
        
        this.runCollisionScripts(other);
        return true;
    }

    runCollisionScripts(other) {
        const scripts = this.gameObject.getComponents(Behaviour);

        scripts.forEach((script) => {
            if (script.enabled) {
                script.onCollision(other);
            }
        }); 
    }

    isAxisCollision(rectA, rectB,  axis) {
        const rectAScalars = [
            this.generateScalar(rectA.upperLeft, axis),
            this.generateScalar(rectA.upperRight, axis),
            this.generateScalar(rectA.lowerLeft, axis),
            this.generateScalar(rectA.lowerRight, axis),
        ];

        const rectBScalars = [
            this.generateScalar(rectB.upperLeft, axis),
            this.generateScalar(rectB.upperRight, axis),
            this.generateScalar(rectB.lowerLeft, axis),
            this.generateScalar(rectB.lowerRight, axis),
        ];

        const rectAMin = Math.min(...rectAScalars);
        const rectAMax = Math.max(...rectAScalars);
        const rectBMin = Math.min(...rectBScalars);
        const rectBMax = Math.max(...rectBScalars);

        if (rectBMin <= rectAMax && rectBMax >= rectAMax) {
            return true;
        } else if (rectAMin <= rectBMax && rectAMax >= rectBMax) {
            return true;
        }

        

        return false;
    }

    generateScalar(rectCorner, theAxis) {
        //Using the formula for Vector projection. Take the corner being passed in
        //and project it onto the given Axis
        let aNumerator = (rectCorner.x * theAxis.x) + (rectCorner.y * theAxis.y);
        let aDenominator = (theAxis.x * theAxis.x) + (theAxis.y * theAxis.y);
        let aDivisionResult = aNumerator / aDenominator;
        let aCornerProjected = new Vector(aDivisionResult * theAxis.x, aDivisionResult * theAxis.y);

        //Now that we have our projected Vector, calculate a scalar of that projection
        //that can be used to more easily do comparisons
        let aScalar = (theAxis.x * aCornerProjected.x) + (theAxis.y * aCornerProjected.y);
        return parseInt(aScalar);
    }
}

export default Collider;
