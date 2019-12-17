import LocomotiveScroll from 'locomotive-scroll';

import bidello from 'bidello';

class Scroll {
    constructor() {
        const scrollContainer = document.getElementById("js-scroll");

        this.scroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            inertia: 0.5,
            smoothMobile: true,
        });

        this.scrollObj = {};
        this.x = 0;
        this.y = 0;
        this.ease = 0;
     
        this.onScroll = this.onScroll.bind(this);

        this.scroll.on("scroll", this.onScroll);
    }

    onScroll({ scroll }) {
        this.scroll.update();

        this.x = scroll.x;
        this.y = scroll.y;

        bidello.trigger({ name: "scroll" }, {
            x: this.x,
            y: this.y,
        })
    }
}

export const scroll = new Scroll();