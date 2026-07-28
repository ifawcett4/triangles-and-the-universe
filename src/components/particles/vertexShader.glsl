uniform float uTime;
uniform float uRadius;
uniform float uSpread;

varying float vDistance;

// Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}


void main() {
  float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
  float size = distanceFactor * 10.0 + 10.0;

  vec3 rotatedPosition = position * rotation3dY(uTime * 0.3 * distanceFactor);

  vec3 particlePosition = rotatedPosition * mix(0.04, 1.0, uSpread);

  vDistance = distanceFactor;

  vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = size;
  gl_PointSize *= (1.0 / -viewPosition.z); // size attenuation
}
