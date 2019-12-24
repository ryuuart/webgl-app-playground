import { Loader } from 'resource-loader';
import bidello from 'bidello';
import deferred from '/js/utils/deferred';

import textures from './gl/utils/textures';

const RESOURCES = [
  {
    name: 'photo',
    url: require('/assets/photo.jpg')
  },
  {
    name: 'Long Cutout',
    url: require('/assets/Long Cutout.png')
  },
  {
    name: 'edgy picture',
    url: require('/assets/edgy picture.jpg')
  },
  {
    name: 'john-fornander-lCpjpQx6jQQ-unsplash',
    url: require('/assets/john-fornander-lCpjpQx6jQQ-unsplash.jpg')
  }

  //  {
  //    name: 'photo',
  //    url: require('/assets/photo.glb'),
  //    loadType: Resource.LOAD_TYPE.XHR,
  //    xhrType: Resource.XHR_RESPONSE_TYPE.BLOB,
  //  },
];

/*
assets.resources.photo.loading.then(res => {
  console.log(res.meta.data);
});
*/

class Assets {
  constructor() {
    this.resources = {};
    this.preloadDOM = document.querySelector(".preload");
    this.preloadDOMText = document.querySelector(".preload__text");

    RESOURCES.forEach(entry => {
      this.resources[entry.name] = entry;
      this.resources[entry.name].loading = deferred();
    });
  }

  load() {
    this.deferred = deferred();
    this.loader = new Loader();

    bidello.trigger({ name: 'loadStart' });

    RESOURCES.forEach(res => {
      this.loader.add(res);
    });

    this.loader.onProgress.add(this.onProgress.bind(this));
    this.loader.use(this.use.bind(this));
    this.loader.load(this.finish.bind(this));

    return deferred;
  }

  use(resource, next) {
    textures.loadTexture({ resource }, next);
  }

  onProgress(loader, meta) {
    bidello.trigger({ name: 'loadProgress' }, { progress: this.loader.progress });

    this.preloadDOMText.textContent = this.loader.progress.toFixed(2);

    const res = this.resources[meta.name];
    res.meta = meta;
    res.loading.resolve(res);
  }

  finish() {
    this.deferred.resolve();

    this.preloadDOM.classList.add("preload__done");

    bidello.trigger({ name: 'loadEnd' }, { resources: this.resources });
  }
}

export default new Assets();
