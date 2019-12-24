import gsap from 'gsap';

import { scroll, raf } from '../../bidello';

import renderer from '../../renderer';
import scene from '../../scene';

export default {
    name: 'default-transition',

    sync: false,

    // from: {
    //     namespace: [],
    // },
    // to: {
    //     namespace: [],
    // },
    leave({ current }) {
        const { container, namespace } = current;

        console.log(namespace);

        gsap.fromTo(container, 1, { opacity: 1 }, { opacity: 0, onComplete: () => {
        }});
    },
    enter({ next }) {
        const { container, namespace } = next;
        
        console.log(namespace)

        gsap.fromTo(container, 1, { opacity: 0 }, { opacity: 1, onComplete: () => {
            document.dispatchEvent(new Event("scroll"))
            window.dispatchEvent(new Event("resize"))
        }});
    },
};