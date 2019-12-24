import gsap from 'gsap';

import { scroll, raf } from '../../bidello';

import renderer from '../../renderer';
import scene from '../../scene';
import dom from '../../gl/dom';

export default {
    name: 'default-transition',

    // from: {
    //     namespace: [],
    // },
    // to: {
    //     namespace: [],
    // },
    leave({ current }) {
        const { container, namespace } = current;

        console.log(namespace);

        for (const gl in dom.instances) {
            const uniforms = dom.instances[gl].material.uniforms;

            gsap.to(uniforms.uProgress, 0.5, { value: 1 });
            console.log(uniforms.uProgress)
        }

        gsap.fromTo(container, 0.5, { autoAlpha: 1 }, { autoAlpha: 0 }).then(() => {
            document.dispatchEvent(new Event("scroll"))
            window.dispatchEvent(new Event("resize"))
            this.async();
        });
    },
    enter({ next }) {
        const { container, namespace } = next;
        
        console.log(namespace)

        for (const gl in dom.instances) {
            const uniforms = dom.instances[gl].material.uniforms;

            gsap.to(uniforms.uProgress, 0.5, { value: 0 });
            console.log(uniforms.uProgress)
        }

        gsap.fromTo(container, 0.5, { autoAlpha: 0 }, { autoAlpha: 1 }).then(() => {
            this.async();
        });
    },
};