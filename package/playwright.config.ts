import {defineConfig} from "@playwright/test";
export default defineConfig({testDir:"./tests",testMatch:"**/*.spec.ts",workers:1,timeout:120000,use:{baseURL:"http://127.0.0.1:3197"},webServer:{command:"node tests/start-test-server.mjs",url:"http://127.0.0.1:3197",reuseExistingServer:false,timeout:120000}});
