import Core from './core';
import Component from './components/component';
import Transform from './components/transform';
import Behaviour from './components/behaviour';

class GameObject {
    constructor(name, tag, ...props) {
        this.name = name;
        this.tag = tag || "default";
        this.transform = new Transform(...props);
        this.components = [this.transform];
    }

    static instantiate(gameObject) {
        Core.GAME_OBJECTS.push(gameObject);
        let scripts = gameObject.getComponents(Behaviour);

        for(let script of scripts) {
            if (script.enabled) {
                script.start();
            }
        }
    }

    static findByName(name) {
        return Core.GAME_OBJECTS.filter(go => go.name === name);
    }

    static findByTag(tag) {
        return Core.GAME_OBJECTS.filter(go => go.tag === tag);
    }

    getComponent(type) {
        return this.components.find(component => component instanceof type);
    }

    getComponents(type) {
        return this.components.filter(component => component instanceof type);
    }

    //TODO: Implement such actions with observer pattern
    addComponent(component) {
        if (component instanceof Component) {
            component.gameObject = this;
            this.components.push(component);
            return component;
        } else {
            throw "Invalid component type";
        }
    }

    removeComponent(type) {
        const component = this.components.find(component => component instanceof type);
        const index = this.components.indexOf(component);

        if (index > -1) {
            delete this.components[index];
            this.components.splice(index, 1);
        }
    }

    destroy() {
        for (var i = 0; i < this.components.length; i++) {
            delete this.components[i];
        }
        const index = Core.GAME_OBJECTS.indexOf(this);

        if (index > -1) {
            delete Core.GAME_OBJECTS[index];
            Core.GAME_OBJECTS.splice(index, 1);
        }
    }
}

export default GameObject;
