import Camera from "./components/camera";

class Input {

    static init() {
        this.keyStates = [];
        this.mousePositionX = 0;
        this.mousePositionY = 0;
        this.leftMouseButtonState = false;
        this.middleMouseButtonState = false;
        this.rightMouseButtonState = false;

        window.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                this.leftMouseButtonState = true;
            } else if (e.button === 1) {
                this.middleMouseButtonState = true;
            } else if (e.button === 2) {
                this.rightMouseButtonState = true;
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.leftMouseButtonState = false;
            } else if (e.button === 1) {
                this.middleMouseButtonState = false;
            } else if (e.button === 2) {
                this.rightMouseButtonState = false;
            }
        });

        window.addEventListener('mousemove', (e) => {
            this.mousePositionX = e.offsetX + Camera.MAIN.xView;
            this.mousePositionY = e.offsetY + Camera.MAIN.yView;
        });

        window.addEventListener('keydown', (e) => {
            if (!e.repeat) {
                this.keyStates[e.key] = 2;
            } else {
                this.keyStates[e.key] = 3;
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keyStates[e.key] = 1;
        });
    }

    static reset() {
        Object.entries(this.keyStates).forEach(([key, value]) => {
            if(value <= 1)
                this.keyStates[key] = 0;
            else
                this.keyStates[key] = 3;
        });
    }

    static getKeyUp(key) {
        return this.keyStates[key] == 1;
    }

    static getKeyDown(key) {
        return this.keyStates[key] == 2;
    }

    static getKey(key) {
        return this.keyStates[key] >= 2;
    }
}

export default Input;
