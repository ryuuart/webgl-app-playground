import LocomotiveScroll from 'locomotive-scroll';

import bidello from 'bidello';

class Scroll {
    constructor() {
        this.scroll = new LocomotiveScroll({
            el: document.getElementById("js-scroll"),
            smooth: true,
            inertia: 0.5,
        });

        this.scrollObj = {};
        this.x = 0;
        this.y = 0;
        this.ease = 0;

        this.onScroll = this.onScroll.bind(this);

        this.scroll.on("scroll", this.onScroll);
    }

    update() {
        this.scroll.update();
    }

    onScroll({ scroll }) {
        this.x = scroll.x;
        this.y = scroll.y;

        bidello.trigger({ name: "scroll"}, {
            x: this.x,
            y: this.y,
        })
    }
}

export const scroll = new Scroll();