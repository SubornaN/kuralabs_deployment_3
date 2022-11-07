const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:8000',
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'results/cypress-this.reporter.xml',
      toConsole: true
    }
  }
})
