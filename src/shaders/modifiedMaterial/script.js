import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.envMapIntensity = 1;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
  "/textures/environmentMaps/3/px.jpg",
  "/textures/environmentMaps/3/nx.jpg",
  "/textures/environmentMaps/3/py.jpg",
  "/textures/environmentMaps/3/ny.jpg",
  "/textures/environmentMaps/3/pz.jpg",
  "/textures/environmentMaps/3/nz.jpg",
]);

scene.background = environmentMap;
scene.environment = environmentMap;

/**
 * Material
 */

// Textures
const mapTexture = textureLoader.load("/models/LeePerrySmith/color.jpg");
mapTexture.colorSpace = THREE.SRGBColorSpace;
const normalTexture = textureLoader.load("/models/LeePerrySmith/normal.jpg");

// Material
const material = new THREE.MeshStandardMaterial({
  map: mapTexture,
  normalMap: normalTexture,
});

const depthMatrial = new THREE.MeshDepthMaterial({
  depthPacking: THREE.RGBADepthPacking,
});

const customUniforms = {
  uTime: { value: 0 },
};

material.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniforms.uTime;

  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
        #include <common>

        uniform float uTime;

        mat2 get2dRotateMatrix(float _angle)
        {
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
    `
  );
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
        #include <begin_vertex>

        float angle = sin(position.y + uTime) * 0.6;
        mat2 rotateMatrix = get2dRotateMatrix(angle);

        transformed.xz = transformed.xz * rotateMatrix;
    `
  );
};

depthMatrial.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniforms.uTime;

  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
        #include <common>

        uniform float uTime;

        mat2 get2dRotateMatrix(float _angle)
        {
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
    `
  );
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
        #include <begin_vertex>

        float angle = sin(position.y + uTime) * 0.6;
        mat2 rotateMatrix = get2dRotateMatrix(angle);

        transformed.xz = transformed.xz * rotateMatrix;
    `
  );
  shader.vertexShader = shader.vertexShader.replace(
    "#include <beginnormal_vertex>",
    `
        #include <beginnormal_vertex>

        objectNormal.xz = objectNormal.xz * rotateMatrix;
    `
  );
};

/**
 * Models
 */
gltfLoader.load("/models/LeePerrySmith/LeePerrySmith.glb", (gltf) => {
  // Model
  const mesh = gltf.scene.children[0];
  mesh.rotation.y = Math.PI * 0.5;
  mesh.material = material;
  mesh.customDepthMaterial = depthMatrial;
  scene.add(mesh);

  // Update materials
  updateAllMaterials();
});

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 13, 15, 15),
  new THREE.MeshStandardMaterial({
    color: "rgba(255, 255, 255, 1)",
    opacity: 0.3,
    transparent: true,
  })
);
plane.rotation.y = Math.PI;
plane.position.x = -1;
plane.position.y = -6;
plane.position.z = 7;
scene.add(plane);

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 2, -2.25);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(4, 1, -4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  customUniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
