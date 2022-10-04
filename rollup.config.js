import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "index.ts",
  output: {
    dir: "build",
    format: "cjs",
  },
  plugins: [typescript(), nodeResolve()],
};
