import gsap from 'gsap';

import { scroll } from '../../bidello';

export default {
    name: 'default-transition',

    sync: true,

    // from: {
    //     namespace: [],
    // },
    // to: {
    //     namespace: [],
    // },

    leave({ current }) {
        scroll.destroy();
        const { container, namespace } = current;

        console.log(namespace);

        gsap.fromTo(container, 0.3, { opacity: 1 }, { opacity: 0 });
    },
    enter({ next }) {
        const { container, namespace } = next;

        console.log(namespace)

        gsap.fromTo(container, 0.3, { opacity: 0 }, { opacity: 1});
    }
};