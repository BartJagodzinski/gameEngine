import Core from "./core/core";
import GameObject from "./core/gameObject";
import Map from "./game/map/map";

const canvas = document.getElementById('main');
const context = canvas.getContext('2d');
export default context;

const handleResize = () => {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
};

const hideUI = () => {
    const ui = document.getElementsByClassName('overlay')[0];
    ui.style.display = 'none';
};

window.getMousePosition = (evt) => {
    const rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;

    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top)  * scaleY,
    };
};

window.startNewGame = () => {
    hideUI();
    handleResize();
    //document.documentElement.requestFullscreen();
    const map = new Map(null, 'Map', 'Map');
    GameObject.instantiate(map);
    Core.start(map);
};

document.addEventListener('contextmenu', event => event.preventDefault());
window.addEventListener('resize', () => handleResize());