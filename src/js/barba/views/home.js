import { scroll, viewport } from '../../bidello'
import renderer from '../../renderer';
import camera from '../../camera';
import scene from '../../scene';

export const home = {
    namespace: "home",
    beforeLeave(data) {
        scroll.destroy();
    },
    afterEnter(data) {
        console.log(data)
        scroll.init();
    },
}