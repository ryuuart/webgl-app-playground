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

### 12/17/2019

#### Preload

**Preload** is arguably one of the most important parts of getting a WebGL app done right. If the stuff isn't loaded and you attempt to work with that _uncreated_ stuff, you get infested with bugs you don't even know where. It's likely because something didn't load on time or it's just not ready yet. For now, there are 2 _very_ important things that must be loaded before doing _anything_. That's **scroll** for virtual scroll and positioning, and **Resources** for loading images, videos, and other things that should be downloaded beforehand.

For virtual scroll, it's loaded on `window.load`, and for resources, it's loaded in `assets.js` with `resource-loader`.

During load, it's a good idea to have a load screen.

#### Virtual Scroll...

There were so many issues that came when bringing in virtual scroll. The main benefit of virtual scroll (despite the accessiblity and usability risks) is that it synchronizes MUCH better with WebGL. It also allows certain effects like parallax, navigation, and any _eased_ scroll effects to be easy peasy. I opted to not go for my own implementation because there are so many layers of complexity to virtual scroll (`getBoundingClientRect()`, maintaining transforms for all DOM elements, parallax, etc.). Locomotive Scroll does all of this and more. 

Also, for the positional sychronization issues, `scroll.update()` must be called before passing the relevant `scrollX` and `scrollY` values to the `scene` and `viewport`. 

#### Common Patterns

`deferred()` promises

This is theoretically an Anti-Pattern for [some](https://medium.com/@7gravity/javascript-promise-anti-patterns-5dcdcf4bd2b6), but for its implementation in this project, `deferred` creates a new `promise`. This promise works like a normal promise, but you can access the `resolve()` and `reject()` methods to use later.

### 12/16/2019

#### More on the libraries

Both bidello and kapla have components and are laid out very similarly. These 2 libraries serve 2 completely different functions. For this project, we use a kapla component to manage the actual DOM element and a bidello component to manage the _global_ events associated with that component. 

Kapla components manage DOM elements by having a lifecycle and registering components labeled with `data-component="componentName"`. In this project, we use Kapla to "querySelectAll()" components with `data-component="trackable"`. Then we "register" the component. The registration is really making a "WebGL Component" and associating meta-data with it.

In `dom.js`, when we register a component, we register a DOM component and its WebGL counterpart. Based on the component type, different WebGL Components will draw. These WebGL components are Dom3D objects and bidello components. Bidello components are components that tap into the bidello event system. Bidello events can be localized or "triggered" (example: scroll) to update interactions across the site. 

#### WebGL Components

WebGL components are DOM elements converted to WebGL. Common things to do with WebGL components are assigning it states, events, and materials. `dom3D.js` contains the skeleton for what a WebGL component should be. WebGL components get dimensions and relevent info from its DOM counterparts, and are added into the WebGL scene through calculations from the DOM. For WebGL components, 2 vital things must happen: `resize` and `scroll` events.  Resize determines the shape and size of the WebGL component, even when the page dimensions changes. Scroll events let the webGL component sync its position on the page. Because many WebGL components extend from `dom3D`, we're able to create reusable and customizable webGL components. Each webGL component has an event system that can be extended and possibly its own materials and shaders. Because of all these properties, adding WebGL components are very easy and done without any harm to the DOM elements.


#### Interesting Details on This Architecture

##### How is the WebGL managed?

The `trackable` Kapla component registers anything that should be a WebGL component. The `dom.js` creates a WebGL component through `three.js` and `bidello` to manage events inside this new component. The new component extends from a base `dom3D` object inside `dom3D.js`. The new extended component can implement its own materials and events to customize the individual interactions.

`dom.js` is like a "controller" or "instance manager". `dom.js` is a controller that creates and destroys any WebGL component on the site. All the instance references are stored in `dom.js` which makes them easy and accessible to manipulate.

##### The best part of this architecture

Everything is a progressive enhancement happening mostly on the Javascript end of things. All of this complexity builds on top of the existing DOM. Because everything is built like a progressive enhancement, the size is super customizable and adaptive to change.

#### Common Patterns

`export default new Object()`

This gives us something like a Singleton. Sometimes, we need things to share, but only one thing should exist. The thing we want to exist shouldn't be imported and instanced. We need to access and update information directly. This is the way to do that with ES6 exports.

`elements["property"]()`

In a JSON, you can access things like a map by using the `elements["property"]` notation. This is way more readable and flexible than numbers.

The `gl` CSS classname

By appending classes whenever certain objects are ready, you're able to sync design changes like hiding visibility more natively; more natively as in not relying on JavaScript to manage all the complexity.

### 12/14/2019

#### Explaining the libraries...

WebGL apps need an event management system separated, cleaner, and encapsulated from the default DOM Event Handling system. [Bidello](https://github.com/luruke/bidello) helps manage this confusion.

WebGL apps need transpilation, loading, and code optimizations. WebPack has a lot of config so we're using [parcel-bundler](https://parceljs.org/) as our bundler. Parcel is zero-config.

Sometimes, it would be great if we could interactively manage the uniforms and attributes inside our shader. It'd be great to see more data and get an interactive view to debug shaders. [Magicshader](https://github.com/luruke/magicshader) comes in for this.

For WebGL apps, the preload phase is _extremely_ important. You need to load everything beforehand to load the textures properly throughout the entire app. [resource-loader](https://github.com/englercj/resource-loader) does this.

To help manage the interaction between DOM and JS without something heavy like jQuery, we're using [kapla](https://github.com/thierrymichel/kapla). We're mainly using Kapla for this WEbGL app because of its `MutationObserver` implementation.

#### MutationObserver

[MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) watches if anything changes in the DOM tree. It'll call a specified callback when a DOM change happens.

