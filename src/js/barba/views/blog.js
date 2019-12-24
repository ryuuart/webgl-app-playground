import { scroll } from '../../bidello'
import renderer from '../../renderer';
import camera from '../../camera';
import scene from '../../scene';

export const blog = {
    namespace: "home",
    beforeLeave(data) {
        scroll.destroy();
    },
    afterEnter(data) {
        scroll.init();
    }
}