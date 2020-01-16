import * as helpers from './bidello';
import renderer from './renderer';
import camera from './camera';
import scene from './scene';
import { component } from 'bidello';
import { scroll } from './bidello';
import settings from './settings';
import postfx from './postfx/postfx';
import assets from './assets';
import trackable from './kapla/Trackable';

import { Application } from 'kapla';

import TransitionManager from './transitionManager';

class Site extends component() {
  init() {
    assets.load();

    document.body.appendChild(renderer.domElement);
  }
  
  onRaf() {
    renderer.render(scene, camera);
    // postfx.render(scene, camera);
  }

  onLoadEnd() {
    this.app = Application.start();
    this.app.register("trackable", trackable);
    this.transitionManager = new TransitionManager();

    console.log('finished loader!');
  }
}

new Site();