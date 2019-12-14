# This is a WebGL App Learning Playground

Using Antipasto by Luruke, I'm going to try to replicate the engineering techniques in this case study:
[Epic Agency We Cargo Case Study](https://medium.com/epicagency/behind-the-scenes-of-we-cargo-3999f5f559c)

### Boilerplate for three.js, using some juicy stuff:

- [bidello](https://github.com/luruke/bidello)
- [magicshader](https://github.com/luruke/magicshader)
- [postfx](https://medium.com/@luruke/simple-postprocessing-in-three-js-91936ecadfb7)
- [detect-gpu](https://github.com/TimvanScherpenzeel/detect-gpu)
- [parcel-bundler](https://parceljs.org/)
- [resource-loader](https://github.com/englercj/resource-loader)
- [glsl-fxaa](https://github.com/mattdesl/glsl-fxaa)
- [orbit-control-es6](https://github.com/silviopaganini/orbit-controls-es6)
- [GPGPU/FBO utility](https://github.com/luruke/antipasto/blob/master/src/js/utils/fbo.js)
- [kapla](https://github.com/thierrymichel/kapla)


### 🏃‍♀️ To Run

```
npm install
npm run dev
```

## 📝 Notes

### 12/14/2019

#### Explaining the libraries...

WebGL apps need an event management system separated, cleaner, and encapsulated from the default DOM Event Handling system. [Bidello](https://github.com/luruke/bidello) helps manage this confusion.

WebGL apps need transpilation, loading, and code optimizations. WebPack has a lot of config so we're using [parcel-bundler](https://parceljs.org/) as our bundler. Parcel is zero-config.

Sometimes, it would be great if we could interactively manage the uniforms and attributes inside our shader. It'd be great to see more data and get an interactive view to debug shaders. [Magicshader](https://github.com/luruke/magicshader) comes in for this.

For WebGL apps, the preload phase is _extremely_ important. You need to load everything beforehand to load the textures properly throughout the entire app. [resource-loader](https://github.com/englercj/resource-loader) does this.

To help manage the interaction between DOM and JS without something heavy like jQuery, we're using [kapla](https://github.com/thierrymichel/kapla). We're mainly using Kapla for this WEbGL app because of its `MutationObserver` implementation.

#### MutationObserver

