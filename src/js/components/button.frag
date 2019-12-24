precision mediump float;

uniform float uTime;
uniform float uProgress;

void main() {
    gl_FragColor = vec4(vec3(1., 1., cos(uTime * 50.)), 1. - uProgress);
}