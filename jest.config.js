module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
    transform: {
        '^.+\\.vue$': 'vue-jest'
    },
    transformIgnorePatterns: ['/node_modules', '/node_modules/(?!click-outside-vue3)'],
    setupFiles: ['jest-fetch-mock']
};
