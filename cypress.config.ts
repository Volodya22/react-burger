import { defineConfig } from 'cypress';
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {},
    viewportWidth: 1440,
    viewportHeight: 1200
  }
});
