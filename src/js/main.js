import * as helpers from './bidello';
import renderer from './renderer';
import camera from './camera';
import scene from './scene';
import { component } from 'bidello';
import settings from './settings';
import postfx from './postfx/postfx';
import assets from './assets';
import trackable from './trackable';

import { Application } from 'kapla';

class Site extends component() {
  init() {
    // dom.register(document.querySelector("a"));

    const app = Application.start();
    app.register("trackable", trackable);
    
    assets.load();
    document.getElementById("canvas-container").appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);
  }

  onRaf() {
    // renderer.render(scene, camera);
    postfx.render(scene, camera);
  }

  onLoadEnd() {
    console.log('finished loader!');
  }
}

new Site();