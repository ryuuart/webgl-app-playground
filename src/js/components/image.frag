precision mediump float;

uniform float uTime;

varying vec3 vPosition;

uniform sampler2D uImage;

void main() {
    vec2 textureCoord = vec2(vPosition.s, vPosition.t) * .5 + .5;

    
    
    gl_FragColor = vec4(
        texture2D(uImage, vec2(textureCoord.x, textureCoord.y + 0.025 * cos(uTime * 50.))).r, 
        texture2D(uImage, vec2(textureCoord.x, textureCoord.y + 0.010 * cos(uTime * 50.))).g, 
        texture2D(uImage, textureCoord).b, 
        texture2D(uImage, textureCoord).a
    );
}