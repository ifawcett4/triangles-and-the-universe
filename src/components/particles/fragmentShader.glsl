varying float vDistance;

uniform vec3 uEmissiveColor;
uniform float uEmissiveIntensity;

void main() {
  vec3 color =vec3(0.0, 0.533, 1.0);
  vec3 color2 = vec3(1.0, 0.0, 0.235);

  
  // Create a strength variable that's bigger the closer to the center of the particle the pixel is
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  // Make it decrease in strength *faster* the further from the center by using a power of 3
  strength = pow(strength, 3.0);

  // Make particle close to the *center of the scene* a warmer color
  // and the ones on the outskirts a cooler color
  color = mix(color, color2, vDistance * 0.5);
  color = mix(vec3(0.0), color, strength);

  // Add emissive glow, scaled by the same strength so it fades at the edges
  vec3 emissive = color * uEmissiveIntensity * strength;
  color += emissive;

  // Here we're passing the strength in the alpha channel to make sure the outskirts
  // of the particle are not visible
  gl_FragColor = vec4(color, strength);
}