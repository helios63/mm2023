export const frag = `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 v_texcoord;

#define NUM_OCTAVES 5

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

mat2 rotation2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat2(
    c, -s,
    s, c
  );
}

void main(void)
{
    vec2 uv = v_texcoord;

    vec2 mouse = u_mouse / u_resolution;
    float dist = distance(uv, mouse);
    float strenght = smoothstep(0.5, 0.0, dist);

    vec4 color1 = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 color2 = vec4(1.0, 1.0, 1.0, 1.0);

    float grain = mix(-0.05, 0.15 + strenght, rand(uv));

    // make movement for Fbm
    vec2 movement = vec2(u_time * 0.001, u_time * -0.001);
    movement *= rotation2d(u_time * 0.0001);

    float f = fbm(uv + movement);
    f *= 65.0;
    f += grain * 0.5;
    f += u_time * 0.2;
    f = fract(f);

    float mixer = smoothstep(0.5, 1.2, f * 3.0) - smoothstep(0.0, 0.5, f);

    vec4 color = mix(color1, color2, mixer);

   gl_FragColor = color;
}
`
