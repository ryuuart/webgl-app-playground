precision mediump float;

uniform sampler2D uImage;

uniform vec2 uRes;
uniform vec2 uImageRes;
uniform float uProgress;

uniform float uTime;

varying vec3 vPosition;

// Background Cover
vec2 imageCover() {
    vec2 s = uRes; // Screen
    vec2 i = uImageRes; // Image
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    return (s / new + offset);
}


void main() {
    vec2 textureCoord = vPosition.xy + 0.5;

    gl_FragColor = vec4(
        texture2D(uImage, vec2(textureCoord.x, textureCoord.y + 0.025 * cos(uTime * 50.))).r, 
        texture2D(uImage, vec2(textureCoord.x, textureCoord.y + 0.010 * cos(uTime * 50.))).g, 
        texture2D(uImage, textureCoord).b, 
        texture2D(uImage, textureCoord).a - uProgress
    );
}