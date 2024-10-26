import glsl from "vite-plugin-glsl";
import { resolve } from "path";

const isCodeSandbox =
  "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

export default {
  root: "src/",
  publicDir: "../static/",
  base: "./",
  server: {
    host: true,
    open: !isCodeSandbox, // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    target: "esnext",
    rollupOptions: {
      input: {
        home: resolve(__dirname, "src/index.html"),

        basic: resolve(__dirname, "src/basic/index.html"),
        transform: resolve(__dirname, "src/basic/transform/index.html"),
        animation: resolve(__dirname, "src/basic/animation/index.html"),
        camera: resolve(__dirname, "src/basic/camera/index.html"),
        screenresize: resolve(__dirname, "src/basic/screenresize/index.html"),
        geometries: resolve(__dirname, "src/basic/geometries/index.html"),
        debug: resolve(__dirname, "src/basic/debug/index.html"),
        texture: resolve(__dirname, "src/basic/texture/index.html"),
        material: resolve(__dirname, "src/basic/material/index.html"),
        "3dtext": resolve(__dirname, "src/basic/3dtext/index.html"),

        classic: resolve(__dirname, "src/classic/index.html"),
        light: resolve(__dirname, "src/classic/light/index.html"),
        shadow: resolve(__dirname, "src/classic/shadow/index.html"),
        hountedhouse: resolve(__dirname, "src/classic/hountedhouse/index.html"),
        particles: resolve(__dirname, "src/classic/particles/index.html"),
        galaxy: resolve(__dirname, "src/classic/galaxy/index.html"),
        scrollanimation: resolve(
          __dirname,
          "src/classic/scrollanimation/index.html"
        ),

        advanced: resolve(__dirname, "src/advanced/index.html"),
        physics: resolve(__dirname, "src/advanced/physics/index.html"),
        importedModel: resolve(
          __dirname,
          "src/advanced/importedModel/index.html"
        ),
        raycaster: resolve(__dirname, "src/advanced/raycaster/index.html"),
        custommodel: resolve(__dirname, "src/advanced/custommodel/index.html"),
        environmentmap: resolve(
          __dirname,
          "src/advanced/environmentmap/index.html"
        ),
        realisticrender: resolve(
          __dirname,
          "src/advanced/realisticrender/index.html"
        ),
        codeStructing: resolve(
          __dirname,
          "src/advanced/codeStructing/index.html"
        ),

        shaders: resolve(__dirname, "src/shaders/index.html"),
        shader: resolve(__dirname, "src/shaders/shader/index.html"),
        shaderPattern: resolve(
          __dirname,
          "src/shaders/shaderPattern/index.html"
        ),
        ragingsea: resolve(__dirname, "src/shaders/ragingsea/index.html"),
        animatedGalaxy: resolve(
          __dirname,
          "src/shaders/animatedGalaxy/index.html"
        ),
        modifiedMaterial: resolve(
          __dirname,
          "src/shaders/modifiedMaterial/index.html"
        ),
        coffeeSmoke: resolve(__dirname, "src/shaders/coffeeSmoke/index.html"),
        hologram: resolve(__dirname, "src/shaders/hologram/index.html"),
        fireworks: resolve(__dirname, "src/shaders/fireworks/index.html"),
        lightShading: resolve(__dirname, "src/shaders/lightShading/index.html"),
        ragingSeaShading: resolve(
          __dirname,
          "src/shaders/ragingSeaShading/index.html"
        ),
        halfton: resolve(__dirname, "src/shaders/halfton/index.html"),
        earth: resolve(__dirname, "src/shaders/earth/index.html"),
        particlesShader: resolve(__dirname, "src/shaders/particles/index.html"),
        particlesMorphing: resolve(
          __dirname,
          "src/shaders/particlesMorphing/index.html"
        ),
        gpgpu: resolve(__dirname, "src/shaders/gpgpu/index.html"),
        wobbly: resolve(__dirname, "src/shaders/wobbly/index.html"),

        extra: resolve(__dirname, "src/extra/index.html"),
        postProcessing: resolve(
          __dirname,
          "src/extra/postProcessing/index.html"
        ),
        performancetip: resolve(
          __dirname,
          "src/extra/performancetip/index.html"
        ),
        introProgress: resolve(__dirname, "src/extra/introProgress/index.html"),
        mixHtml: resolve(__dirname, "src/extra/mixHtml/index.html"),

        portal: resolve(__dirname, "src/portal/index.html"),
      },
    },
  },
  plugins: [glsl()],
};
