varying vec3 vColor;

void main()
{
  // float strength = distance(gl_PointCoord, vec2(0.5));
  // strength = step(0.5, strength);
  // strength = 1.0 - strength;

  // float strength = distance(gl_PointCoord, vec2(0.5));
  // strength *= 2.0;
  // strength = 1.0 - strength;

  float strength = pow(1.0 - distance(gl_PointCoord, vec2(0.5)), 10.0);

  vec3 color = mix(vec3(0.0), vColor, strength);

  gl_FragColor = vec4(color, 1.0);
}