const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://54.144.111.183:5000',
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'results/cypress-this.reporter.xml',
      toConsole: true
    }
  }
})
