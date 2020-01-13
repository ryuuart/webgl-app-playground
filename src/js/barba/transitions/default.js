import gsap from 'gsap';

import { scroll, raf } from '../../bidello';

import renderer from '../../renderer';
import scene from '../../scene';
import dom from '../../gl/dom';

export default {
    name: 'default-transition',

    leave({ current }) {
        const done = this.async();
        const { container, namespace } = current;

        console.log(namespace);

        const uProgresses = [];
        for (const gl in dom.instances) {
            const uniforms = dom.instances[gl].material.uniforms;
            uProgresses.push(uniforms.uProgress);
        }

        
        gsap.fromTo(container, 0.5, { autoAlpha: 1 }, { autoAlpha: 0 }).then(() => {
            container.style.display = "none";
            done();
        });
        
        gsap.to(uProgresses, 0.5, { value: 1 })
    },
    beforeEnter({ next }) {
        const { container, namespace } = next;

        container.style.opacity = '0';
    },
    after({ next }) {
        const done = this.async();
        const { container, namespace } = next;
        
        console.log(namespace)
        
        const uProgresses = [];
        for (const gl in dom.instances) {
            const uniforms = dom.instances[gl].material.uniforms;
            uProgresses.push(uniforms.uProgress);
        }

        gsap.fromTo(container, 0.5, { autoAlpha: 0 }, { autoAlpha: 1 }).then(() => {
            done();
        });

        gsap.to(uProgresses, 0.5, { value: 0 })
    },
};