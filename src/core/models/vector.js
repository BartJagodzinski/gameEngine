class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    rotate(angle) {
        let theta = angle * Math.PI / 180;
        let cos = Math.cos(theta);
        let sin = Math.sin(theta);

        let matrix = [ cos, -sin,
                       sin,  cos ];

        let x1 = matrix[0] * this.y + matrix[1] * this.x;
        let y1 = matrix[2] * this.y + matrix[3] * this.x;

        this.x = y1;
        this.y = x1;
    }

    rotateAboutOrigin(origin, angle) {
        this.x -= origin.x;
        this.y -= origin.y;
        
        this.rotate(angle);
        
        this.x += origin.x;
        this.y += origin.y;
    }

    normalize() {
        let len = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
        let result = new Vector(this.x / len, this.y / len);
        return result;
    }

    add(vec) {
        let result = new Vector(this.x + vec.x, this.y + vec.y);
        return result;
    }

    sub(vec) {
        let result = new Vector(this.x - vec.x, this.y - vec.y);
        return result;
    }

    mul(scalar) {
        let result = new Vector(this.x * scalar, this.y * scalar);
        return result; 
    }

    div(scalar) {
        let result = new Vector(this.x / scalar, this.y / scalar);
        return result;
    }
}

export default Vector;
