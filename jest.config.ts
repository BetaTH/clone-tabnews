import { config as dotenvConfig } from "dotenv";
import type { Config } from "jest";
import nextJest from "next/jest.js";

dotenvConfig({
  path: ".env.development",
});

const createJestConfig = nextJest({
  dir: "./",
});

const jestConfig: Config = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
};

export default createJestConfig(jestConfig);
