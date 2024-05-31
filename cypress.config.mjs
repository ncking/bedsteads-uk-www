import { defineConfig } from "cypress";
import webpack from '@cypress/webpack-preprocessor'
import cyFailed from 'cypress-failed-log/on'


export const RULE_JSX_TSX_BABEL = {
  test: /\.(js|ts)x?$/,
  exclude: /(node_modules)/,
  resolve: {
    fullySpecified: false,
  },
  use: {
    loader: 'babel-loader',
  },
}


const webpackResolve = webpack({
  webpackOptions: {
    node: false,
    module: {
      rules: [RULE_JSX_TSX_BABEL],
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.ts', '.js', '.mjs']
    }
  }

})

export default defineConfig({
  video: false,
  projectId: "giib7m",
  viewportHeight: 1260,
  viewportWidth: 2000,
  e2e: {
    testIsolation: false,
    experimentalRunAllSpecs: true,
    baseUrl: 'http://localhost:4001/' ,
    specPattern: 'cypress/e2e/**/*.cy.{mjs,cjs,js,jsx,ts,tsx}',
    excludeSpecPattern: process.env.CI ? ['cypress/e2e/all.cy.js'] : [], //We don't want to run all specs individually AND run them again by hitting the all.cy.js spec file on CI, so exclude it from CI/CD
    //nodeVersion: "system",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // https://github.com/bahmutov/cypress-failed-log
      cyFailed(on);
      on('file:preprocessor', webpackResolve)
    },


  },
});


