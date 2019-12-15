import { Component } from 'kapla';
import dom from './gl/dom';

export default class extends Component {
    init() {
      dom.register(this.$el);
      console.log(this.$el);
    }
  
    destroy() {
      dom.unregister(this.$el);
    }
}