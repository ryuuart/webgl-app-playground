import { scroll } from '../../bidello'
import renderer from '../../renderer';
import camera from '../../camera';
import scene from '../../scene';

export const blog = {
    namespace: "home",
    beforeLeave(data) {
        scroll.destroy();
    },
    beforeEnter(data) {
        scroll.init();
    }
}