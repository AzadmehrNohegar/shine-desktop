/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
// eslint-disable-next-line no-undef
module.exports = {
  productName: "نرم افزار فروشگاهی شاین",
  directories: {
    output: "dist/electron",
  },
  publish: null,
  npmRebuild: false,
  files: ["dist/backend/**/*", "dist/preload/**/*", "dist/frontend/**/*"],
  extraResources: [
    "resources/database.db",
    "node_modules/.prisma/**/*",
    "node_modules/@prisma/client/**/*",
  ],
};
