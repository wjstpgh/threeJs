import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { RGBELoader } from "three/addons/loaders/RGBELoader";
import { EXRLoader } from "three/addons/loaders/EXRLoader";
import { GroundProjectedSkybox } from "three/addons/objects/GroundProjectedSkybox";

const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const rgbeLoader = new RGBELoader();
const exrLoader = new EXRLoader();
const textureLoader = new THREE.TextureLoader();

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
const global = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material.isMeshStandardMaterial) {
      child.material.envMapIntensity = global.envMapIntensity;
    }
  });
};

global.envMapIntensity = 3;
gui
  .add(global, "envMapIntensity")
  .min(0)
  .max(10)
  .step(0.01)
  .onChange(updateAllMaterials);

// const environmetMap = cubeTextureLoader.load([
//   "/textures/environmentMaps/0/px.png",
//   "/textures/environmentMaps/0/nx.png",
//   "/textures/environmentMaps/0/py.png",
//   "/textures/environmentMaps/0/ny.png",
//   "/textures/environmentMaps/0/pz.png",
//   "/textures/environmentMaps/0/nz.png",
// ]);

// scene.environment = environmetMap;
// scene.background = environmetMap;

// rgbeLoader.load("/textures/environmentMaps/0/2k.hdr", (envMap) => {
//   envMap.mapping = THREE.EquirectangularReflectionMapping;

//   scene.background = envMap;
//   scene.environment = envMap;
// });

// exrLoader.load("/textures/environmentMaps/nvidiaCanvas-4k.exr", (envMap) => {
//   envMap.mapping = THREE.EquirectangularReflectionMapping;

//   scene.background = envMap;
//   scene.environment = envMap;
// });

// const environmentMap = textureLoader.load(
//   "/textures/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg"
// );
// environmentMap.mapping = THREE.EquirectangularReflectionMapping;
// environmentMap.colorSpace = THREE.SRGBColorSpace;

// scene.background = environmentMap;
// scene.environment = environmentMap;

// rgbeLoader.load("/textures/environmentMaps/0/2k.hdr", (env) => {
//   env.mapping = THREE.EquirectangularReflectionMapping;
//   scene.environment = env;

//   const skybox = new GroundProjectedSkybox(env);
//   skybox.radius = 120;
//   skybox.height = 11;
//   skybox.scale.setScalar(50);
//   scene.add(skybox);

//   gui.add(skybox, "radius", 1, 200, 0.1).name("skyboxRadius");
//   gui.add(skybox, "height", 1, 200, 0.1).name("skyboxHeight");
// });

const environmentMap = textureLoader.load(
  "/textures/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg"
);
environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.colorSpace = THREE.SRGBColorSpace;

scene.background = environmentMap;
scene.backgroundBlurriness = 0;
scene.backgroundIntensity = 0.8;

const holyDonut = new THREE.Mesh(
  new THREE.TorusGeometry(8, 0.5),
  new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
);
holyDonut.layers.enable(1);
holyDonut.position.y = 3.5;
scene.add(holyDonut);

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
  type: THREE.HalfFloatType,
});

scene.environment = cubeRenderTarget.texture;

const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
cubeCamera.layers.set(1);

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: 0xaaaaaa,
  })
);
torusKnot.position.x = -4;
torusKnot.position.y = 4;
scene.add(torusKnot);

gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);

  updateAllMaterials();
});

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
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();

  if (holyDonut) {
    holyDonut.rotation.x = Math.sin(elapsedTime) * 2;
    cubeCamera.update(renderer, scene);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
