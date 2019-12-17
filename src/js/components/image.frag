precision mediump float;

uniform float uTime;

varying vec3 vPosition;

uniform sampler2D uImage;

void main() {
    vec2 textureCoord = vec2(vPosition.s, vPosition.t) * .5 + .5;
    gl_FragColor = texture2D(uImage, textureCoord);
}