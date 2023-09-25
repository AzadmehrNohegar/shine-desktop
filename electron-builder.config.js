/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
// eslint-disable-next-line no-undef
module.exports = {
  productName: "نرم افزار فروشگاهی شاین",
  directories: {
    buildResources: "resources",
    output: "dist/electron",
  },
  win: {
    target: ["nsis", "msi"],
    icon: "resources/logo.png",
  },
  icon: "resources/logo.png",
  npmRebuild: false,
  files: [
    "dist/backend/**/*",
    "dist/preload/**/*",
    "dist/frontend/**/*",
    "resources/**/*",
  ],
  extraResources: [
    "resources/database.db",
    "node_modules/.prisma/**/*",
    "node_modules/@prisma/client/**/*",
  ],
};
