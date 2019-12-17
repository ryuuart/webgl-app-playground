import Button from "../components/button";
import Image from "../components/image";

const elements = {
  button: Button,
  image: Image
};

class Dom {
  constructor() {
    this.id = 0;
    this.instances = {};
  }

  register(el) {
    const id = `id_${this.id++}`;
    el.dataset.glid = id;
    const type = el.dataset.type || "button";
    const instance = new elements[type](el);
    this.instances[id] = instance;
    el.classList.add("gl");
  }

  getInstanceFromEl(el) {
    return this.instances[el.dataset.glid];
  }

  unregister(el) {
    const instance = this.getInstanceFromEl(el);
    el.classList.remove("gl");
    instance.destroy();
  }
}

export default new Dom();
