import {
    Mesh,
    PlaneBufferGeometry,
    RawShaderMaterial,
  } from 'three';
  
  import dom3D from '../dom3D';
  import scene from '../scene';
  // import textures from './gl/utils/textures';
  
  const geometry = new PlaneBufferGeometry(1, 1, 10, 10);
  
  const material = new RawShaderMaterial({
    transparent: true,
    fragmentShader: require('./button.frag'),
    vertexShader: require('./button.vert'),
  });

  export default class extends dom3D {
    init() {
      super.init();
  
      this.geometry = geometry;
      this.material = material.clone();
  
      this.material.uniforms = {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        // uWind: { value: textures.fromAsset('wind') },
        // uShow: { value: 0 },
        // uClipping: { value: 1.0 }
      };
  
      this.mesh = new Mesh(this.geometry, this.material);
  
      this.add(this.mesh);
      scene.add(this);
      
      // Handle hovers...
    }
  
    onRaf({ delta }) {
      super.onRaf();
  
      this.material.uniforms.uTime.value += delta * 0.1;
    }
  }