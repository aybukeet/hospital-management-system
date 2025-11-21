const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        video: true,
        videoCompression: 32,
        setupNodeEvents(on, config) {
            // Node event listeners
        },
    },
})
