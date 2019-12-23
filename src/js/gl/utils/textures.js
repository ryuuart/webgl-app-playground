import {
    TextureLoader
} from 'three';

import assets from '../../assets';

class Textures {
    constructor() {
        this.textures = {};
        this.loader = new TextureLoader();
    }

    loadTexture({ name, url, resource }) {
        if (resource) {
            this.textures[resource.name] = this.loader.load(resource.url);
        } else 
            this.textures[name] = this.loader.load(url);
    }

    loadTextureFromAsset(name) {
        const { url, meta } = assets.resources[name];

        if (meta.type === 3) {
            const texture = this.loader.load(url);

            this.textures[name] = texture;

            return texture;
        } else {
            console.error("The asset is not of type image");
        }
    }

    fromAsset(name) {
        const texture = assets.resources[name];

        if (typeof texture.meta === "Texture") {
            return texture;
        } else {
            console.error("This asset is not a texture");
        }
    }

    getTexture(name) {
        return this.textures[name];
    }
}

export default new Textures();