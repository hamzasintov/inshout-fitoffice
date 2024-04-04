import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./src/swagger/swagger.json",
  apiFile: "./src/app/store/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./src/app/store/fitOf.ts",
  exportName: "fitOf",
  hooks: true,
};

export default config;
