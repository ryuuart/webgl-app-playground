import { Component } from 'kapla';
import dom from './gl/dom';

import { scroll } from './bidello';

export default class extends Component {
    init() {
      dom.register(this.$el);
      console.log(this.$el);

      scroll.update();
    }
  
    destroy() {
      dom.unregister(this.$el);
    }
}