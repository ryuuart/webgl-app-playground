import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import site from './main';
import { scroll, viewport, raf } from './bidello';
import bidello, { component } from 'bidello';

import trackable from './kapla/Trackable';

import defaultTransition from './barba/transitions/default';

import { home, blog } from './barba/views';

class TransitionManager extends component() {
    init() {
        barba.use(barbaPrefetch);
        
        this.barba = barba.init({
            debug: true,
            transitions: [defaultTransition],
        })

        barba.hooks.before(() => {
            scroll.destroy();
        })

        barba.hooks.after((data) => {
            document.dispatchEvent(new Event("scroll"))
            window.dispatchEvent(new Event("resize"))
            scroll.init();
        });

        console.log("Transition Manager loaded");
    }

    registerTransition(from, to) {
        defaultTransition.from.namespace.push(from);
        defaultTransition.to.namespace.push(to);
    }
}

export default TransitionManager;