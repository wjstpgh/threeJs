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
    rollupOptions: {
      input: {
        home: resolve(__dirname, "src/index.html"),
        "3dtext": resolve(__dirname, "src/3dtext/index.html"),
        animation: resolve(__dirname, "src/animation/index.html"),
        camera: resolve(__dirname, "src/camera/index.html"),
        custommodel: resolve(__dirname, "src/custommodel/index.html"),
        codeStructing: resolve(__dirname, "src/codeStructing/index.html"),
        debug: resolve(__dirname, "src/debug/index.html"),
        environmentmap: resolve(__dirname, "src/environmentmap/index.html"),
        galaxy: resolve(__dirname, "src/galaxy/index.html"),
        geometries: resolve(__dirname, "src/geometries/index.html"),
        hountedhouse: resolve(__dirname, "src/hountedhouse/index.html"),
        importedModel: resolve(__dirname, "src/importedModel/index.html"),
        light: resolve(__dirname, "src/light/index.html"),
        material: resolve(__dirname, "src/material/index.html"),
        particles: resolve(__dirname, "src/particles/index.html"),
        physics: resolve(__dirname, "src/physics/index.html"),
        raycaster: resolve(__dirname, "src/raycaster/index.html"),
        realisticrender: resolve(__dirname, "src/realisticrender/index.html"),
        screenresize: resolve(__dirname, "src/screenresize/index.html"),
        scrollanimation: resolve(__dirname, "src/scrollanimation/index.html"),
        shader: resolve(__dirname, "src/shader/index.html"),
        shaderPattern: resolve(__dirname, "src/shaderPattern/index.html"),
        shadow: resolve(__dirname, "src/shadow/index.html"),
        texture: resolve(__dirname, "src/texture/index.html"),
        transform: resolve(__dirname, "src/transform/index.html"),
      },
    },
  },
  plugins: [glsl()],
};
