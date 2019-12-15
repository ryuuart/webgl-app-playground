// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Scene } from 'three';
import { component } from 'bidello';
import Cube from './cube/cube';
import camera from './camera';
import dom3D from './dom3D';

class Stage extends component(Scene) {
  init() {
    // this.add(new Cube());
    // this.add(new dom3D());
    this.add(camera);
  }
}

export default new Stage();