import { TextureLoader, LinearFilter } from "three";

import assets from "../../assets";

import renderer from "../../renderer";

class Textures {
  constructor() {
    this.textures = {};
    this.loader = new TextureLoader();
  }

  loadTexture({ name, url, resource }, next) {
    if (resource) {
      this.loader.load(
        resource.url,
        texture => {
          texture.generateMipmaps = false;
          texture.minFilter = LinearFilter;
          texture.needsUpdate = true;

          renderer.initTexture(texture, 0);
          this.textures[resource.name] =  texture;
          next();
        }
      );
    } else this.textures[name] = this.loader.load(url);
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
