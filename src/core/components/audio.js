import Component from './component';

class AudioSource extends Component {

    constructor(source, ...props) {
        super(...props);
        this.sound = new Audio(source) || null;   
    }
    
    setSource(source){
        this.sound.src = source;
    }

    play() {
        this.sound.play();
    }

    volume(value) {
        this.sound.volume = value;
    }

    loop(bool) {
        this.sound.loop = bool;
    }

    stop() {
        this.sound.stop();
    }
   
}

export default AudioSource;
