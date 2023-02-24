import context from '../App';
import Game from '../game/game';
import Behaviour from './components/behaviour';
import Collider from './components/collider';
import Drawable from './components/drawable';
import Input from './input';
import Camera from './components/camera';

class Core {
    static GAME_OBJECTS = [];
    static GAME_MAP = null;
    static #FPS = 60;
    static #INTERVAL = 1000 / Core.#FPS;  // milliseconds between one frame
    static #STEP = Core.#INTERVAL / 1000; // seconds between one frame
    static #started = false;

    static update() { // Proc every frame
        Core.GAME_OBJECTS.forEach((gameObject) => {
            const scripts = gameObject.getComponents(Behaviour);

            scripts?.forEach((script) => {
                if (script.enabled) {
                    script.update();
                }
            });
        });
        Camera.MAIN.update();
    }

    // Proc after update every frame
    static checkCollision() {
        const activeColliders = Core.getActiveColliders();
        const dynamicColliders = activeColliders.filter((collider) => !collider.isStatic);

        dynamicColliders.forEach((collider) => {
            let collisionFound = false;
            activeColliders.forEach((other) => {
                if (collider !== other) {
                    collisionFound ||= collider.checkCollision(other);
                }
            });
            collider.isColliding = collisionFound;
        });
    }

    static getActiveColliders() {
        const activeColliders = [];

        Core.GAME_OBJECTS.forEach((gameObject) => {
            activeColliders.push(
                ...gameObject.getComponents(Collider)
                .filter((collider) => collider.enabled)
            );
        });

        return activeColliders;
    }

    // Proc after checkCollision every frame
    static draw() { 
        context.clearRect(0,0,context.canvas.width,context.canvas.height);

        Core.GAME_OBJECTS.forEach((gameObject) => {
            gameObject.getComponents(Drawable)
            .forEach((drawable) => drawable.draw(context, Camera.MAIN));
        });
    }

    static start(mapObject) {
        if (!Core.#started) {
            Input.init();
            this.assignMap(mapObject);
            let game = new Game();
            game.start();
            Core.#started = true;
            requestAnimationFrame(Core.start);
        } else {
            Core.update();
            Core.checkCollision();
            Input.reset();
            Core.draw();
            requestAnimationFrame(Core.start);
        }
    }

    static assignMap(mapObject) {
        this.GAME_MAP = mapObject;
    }
}

export default Core;
