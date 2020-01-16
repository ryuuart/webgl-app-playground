import LocomotiveScroll from 'locomotive-scroll';
import Smooth from 'smooth-scrolling';

import bidello from 'bidello';
import { smoothMax } from 'math-toolbox';

export class Scroll {
    constructor() {
        this.scrollContainer = document.getElementById("js-scroll");
        
        this.onScroll = this.onScroll.bind(this);

        this.scroll = new Smooth({
            preload: true,
           section: this.scrollContainer,
           callback: this.onScroll,
           divs: this.scrollContainer.children
        });

        this.scroll.init();

        this.scrollObj = {};
        this.x = 0;
        this.y = 0;
        this.ease = 0;
    }

    destroy() {
        this.scroll.destroy();
    }

    init(container = document.getElementById("js-scroll")) {
        this.scrollObj = {};
        this.x = 0;
        this.y = 0;
        this.ease = 0;

        this.scrollContainer = container;

        this.onScroll = this.onScroll.bind(this);

        this.scroll = new Smooth({
            preload: true,
           section: this.scrollContainer,
           callback: this.onScroll,
           divs: this.scrollContainer.children
        });

        this.scroll.init();
    }

    // onScroll({ scroll }) {
    //     this.scroll.update();

    //     this.x = scroll.x;
    //     this.y = scroll.y;

    //     bidello.trigger({ name: "scroll" }, {
    //         x: this.x,
    //         y: this.y,
    //     })
    // }
    onScroll(val) {
        this.x = window.scrollX || window.pageXOffset;
        this.y = (val || this.y);

        bidello.trigger({ name: "scroll" }, {
            x: this.x,
            y: this.y,
        })
    }
}

export const scroll = new Scroll();