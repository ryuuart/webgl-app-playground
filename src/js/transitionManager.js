import barba from '@barba/core';
import site from './main';
import { scroll, viewport, raf } from './bidello';
import bidello, { component } from 'bidello';

import trackable from './kapla/Trackable';

import defaultTransition from './barba/transitions/default';

class TransitionManager extends component() {
    init() {
        this.barba = barba.init({
            preventRunning: true,
            transitions: [defaultTransition]
        })

        barba.hooks.before(
            ({ current, next, trigger }) => {
                console.log("barba hook leave")
                scroll.destroy();
                
            }
        )

        barba.hooks.after(
            ({ current, next, trigger }) => {
                console.log("barba hook after enter")
                
                raf.onTick(raf.time);
                viewport.onResize();
                
                scroll.init();
                scroll.onScroll();
            }
        )

        console.log("Transition Manager loaded");
    }

    registerTransition(from, to) {
        defaultTransition.from.namespace.push(from);
        defaultTransition.to.namespace.push(to);
    }
}

export default TransitionManager;