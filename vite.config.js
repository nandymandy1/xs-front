import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import { resolve } from "path";

const folders = [
  "pages",
  "store",
  "utils",
  "guards",
  "graphql",
  "hooks",
  "assets",
  "layouts",
  "services",
  "constants",
  "components",
  "providers",
  "theme",
];

const getDirectory = (dir = null) =>
  resolve(__dirname, dir ? `src/${dir}` : `src`);

const getAlias = () => ({
  alias: folders.reduce(
    (acc, folder) => ({ ...acc, [`@${folder}`]: getDirectory(folder) }),
    { "@": getDirectory() }
  ),
});

export default defineConfig({
  plugins: [react()],
  resolve: getAlias(),
  server: {
    port: 5001,
  },
});
