precision mediump float;
        
attribute vec3 normal;
attribute vec3 position;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float uTime;

void main() {
  vec4 clipSpace = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vec2 uv = ((clipSpace.xy / clipSpace.w) + 1.0) / 2.0;
  vec4 pos = modelMatrix * vec4(position, 1.0);

  pos.y += sin(pos.x + uTime * 50.) * 0.075;

  gl_Position = projectionMatrix * viewMatrix * pos;
}