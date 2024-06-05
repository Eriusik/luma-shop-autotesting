const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento-2.showcase-wallee.com/',
    browser: 'chrome',
    supportFile: false
  },
})